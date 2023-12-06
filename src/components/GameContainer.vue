<template>
  <div>
    <div class="game" v-if="lives > 0">
      <div class='container selection'>
        <div class='textinput'>
          <o-autocomplete class='input' type='text' v-model='show' placeholder='e.g. Naruto' :data='filteredDataObj'
            field='title.english' clearAble expanded @select='(option: any) => (selected = option)'>
            <template #empty>No results found</template>
          </o-autocomplete>
        </div>
        <div class='buttons'>
          <button @click='submitShow' class='button'>Submit</button>
        </div>
      </div>
      <div>
        <font-awesome-icon v-for="index in lives" :key="index" class='icon' :icon='["fas", "heart"]' />
      </div>
      <div class=''>
        <div class="columns">
          <GuessesTable :guesses='guesses' :solution='solution' :key="status" v-if="status === 'playing'" />
        </div>
      </div>
    </div>
    <div class="result" v-if="lives <= 0">
      <GameResults :solution='solution' :status='status' :key="status" />
      <o-button @click="resetGame()" class="reset" label="Reset" variant="primary" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, watch } from 'vue';
import shows from '@/assets/shows.json';
import GuessesTable from './GuessesTable.vue';
import GameResults from './GameResults.vue';

// function to call anilist api
async function callAnilist(id: number) {
  // call anilist api
  const animeinfo = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query: `
      query ($id: Int) {
        Media (id: $id, type: ANIME isAdult: false popularity_greater:1000) {
          id
          title {
            romaji
            english
          }
          averageScore
          season
          seasonYear
          genres
          source
          popularity
          studios (isMain:true){
            nodes{name}
          }
          coverImage{
            medium
            large
          }
          relations{
            nodes{
              id
              title{
                english
                romaji
              }
            }
          }
        }
      }
      `,
      variables: {
        id,
      },
    }),
  }).then((res) => res.json());
  return animeinfo.data.Media;
}

// variables
const OPTIONS_LIMIT = 5;
const show = ref('');
const selected = ref(null);
const guesses = ref([]);
let solution = await callAnilist(16498);
const lives = ref(5);
const status = ref('playing');

// filters out the json data for autocomplete and shows only the OPTIONS_LIMIT amount of results
const filteredDataObj = computed(() => shows.filter(
  (option) => {
    if (option.title.english === null) {
      return '';
    }
    return option.title.english.toString().toLowerCase().indexOf(show.value.toLowerCase()) >= 0;
  },
).slice(0, OPTIONS_LIMIT));

async function submitShow() {
  // get the show information
  if (selected.value === null) {
    console.log('Please select a show');
    return;
  }
  // get the data from anilist
  const animeinfo = await callAnilist(selected.value.id);

  // clear text box
  selected.value = null;
  show.value = '';

  // process guess
  if (animeinfo.id === solution.id) {
    // transfer to win screen
    status.value = 'win';
    lives.value = 0;
    return;
  }
  lives.value -= 1;
  if (lives.value === 0) {
    status.value = 'lose';
    // transfer to game over screen
  }

  // add data to guesses
  guesses.value.push(animeinfo);
}

async function resetGame() {
  // reset the game
  lives.value = 5;
  guesses.value.length = 0;
  selected.value = null;
  const newSolutionId = shows[Math.floor(Math.random() * shows.length)].id;
  await callAnilist(newSolutionId).then((res) => {
    console.log('sol', res);
    solution = res;
    status.value = 'playing';
  });
}

</script>
<style scoped lang='scss'>
.textinput {
  width: 20%;
  margin-right: 0.25rem;
}

.selection {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 2rem auto;
}

.icon {
  font-size: 2rem;
  margin: 0.5rem;
  color: red;
  margin-bottom: 2rem;
}

.reset {
  margin-top: 2rem;
}
</style>
