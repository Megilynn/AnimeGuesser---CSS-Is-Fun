<template>
  <div class='column'>
    <div class='card pic'>
      {{ guess.title.english }}
    </div>
  </div>
  <div class='column'>
    <div class='card' :class="genresColor">
      <div>
        <o-tooltip v-for="icon in genres[0]" v-bind:key="icon" :label=cleanGenreString(icon)>
          <FontAwesomeIcon class="icon" :icon="convertGenresToIcon(icon)" />
        </o-tooltip>
      </div>
      <br />
      <div>
        <o-tooltip v-for="icon in genres[1]" v-bind:key="icon" :label=cleanGenreString(icon)>
          <FontAwesomeIcon class="icon" :icon="convertGenresToIcon(icon)" />
        </o-tooltip>
      </div>
    </div>
  </div>
  <div class='column'>
    <div class='card' :class="popularityColor">
      {{ checkPopularity() }}
      <FontAwesomeIcon v-if="popArr == 'higher'" class="icon" icon="fa-arrow-up" />
      <FontAwesomeIcon v-if="popArr == 'lower'" class="icon" icon="fa-arrow-down" />
    </div>
  </div>
  <div class='column'>
    <div class='card' :class="sourceColor">
      {{ checkSource() }}
    </div>
  </div>
  <div class='column'>
    <div class='card' :class="seasonColor">
      {{ checkSeason() }}
      <FontAwesomeIcon v-if="seaArr == 'higher'" class="icon" icon="fa-arrow-up" />
      <FontAwesomeIcon v-if="seaArr == 'lower'" class="icon" icon="fa-arrow-down" />
    </div>
  </div>
  <div class='column'>
    <div class='card studio' :class="studioColor">
      {{ checkStudio() }}
    </div>
  </div>
  <div class='column'>
    <div class='card related' :class="seriesColor">
      {{ relatedSeries }}
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref, defineProps, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import GuessesTable from './GuessesTable.vue';

const props = defineProps(['guess', 'solution']);
// console.log('guess', props.guess);
// console.log('solution', props.solution);
// helper variables

// special values for output
const relatedSeries = ref('Related Series');

// css markers for each row
const genresColor = ref('');
const studioColor = ref('');
const seasonColor = ref('');
const popularityColor = ref('');
const sourceColor = ref('');
const seriesColor = ref('');
const popArr = ref('');
const seaArr = ref('');

// split genres in half for display
const genres = computed(() => {
  const half = Math.ceil(props.guess.genres.length / 2);
  const firstHalf = props.guess.genres.slice(0, half);
  const secondHalf = props.guess.genres.slice(half, props.guess.genres.length);
  return [firstHalf, secondHalf];
});

// generate the new values needed for each component
// functions for title card
// functions for season card
function checkSeason() {
  if (props.guess.seasonYear === props.solution.seasonYear) {
    if (props.guess.season === props.solution.season) {
      seasonColor.value = 'green';
    } else {
      seasonColor.value = 'yellow';
    }
  } else {
    seasonColor.value = 'red';
    if (props.guess.seasonYear > props.solution.seasonYear) {
      seaArr.value = 'lower';
    } else {
      seaArr.value = 'higher';
    }
  }

  // eslint-disable-next-line
  const seasonText = props.guess.season + ' ' + props.guess.seasonYear;
  return seasonText;
}

// function for popularity card
function checkPopularity() {
  if (props.guess.popularity === props.solution.popularity) {
    popularityColor.value = 'green';
  } else {
    popularityColor.value = 'red';
    if (props.guess.popularity > props.solution.popularity) {
      popArr.value = 'lower';
    } else {
      popArr.value = 'higher';
    }
  }
  return props.guess.popularity;
}

// functions for source card
function checkSource() {
  if (props.guess.source === props.solution.source) {
    sourceColor.value = 'green';
  } else {
    sourceColor.value = 'red';
  }
  const source = props.guess.source.replace('_', ' ');
  return source;
}

// functions for genre card
function cleanGenreString(genre: string) {
  let gIcon = genre.toLowerCase();
  gIcon = gIcon.replace(/\s/g, '');
  return gIcon;
}

function convertGenresToIcon(genre: string) {
  // convert genre to lowercase and remove spaces
  const gIcon = cleanGenreString(genre);
  // return the icon
  const iconMap = {
    action: '  fa-shield',
    adventure: 'fa-dungeon',
    comedy: 'fa-face-laugh-squint',
    drama: '  fa-masks-theater',
    ecchi: 'fa-carrot',
    fantasy: 'fa-dragon',
    horror: 'fa-skull',
    mahoushoujo: 'fa-wand-magic-sparkles',
    mecha: 'fa-robot',
    music: 'fa-music',
    mystery: 'fa-puzzle-piece',
    psychological: 'fa-brain',
    romance: 'fa-heart',
    scifi: 'fa-satellite',
    sliceoflife: 'fa-bread-slice',
    sports: 'fa-football',
    supernatural: 'fa-ghost',
    thriller: 'fa-biohazard',
  };
  // update color of card
  return iconMap[gIcon];
}

function arrayEquals(a, b) {
  return Array.isArray(a)
    && Array.isArray(b)
    && a.length === b.length
    && a.every((val, index) => val === b[index]);
}

function relatedGenresCheck() {
  // check if two arrays are equal
  if (props.guess.genres.length === props.solution.genres.length) {
    if (arrayEquals(props.solution.genres, props.guess.genres)) {
      genresColor.value = 'green';
      return;
    }
  }
  const found = props.guess.genres.some((r) => props.solution.genres.includes(r));
  if (found) {
    genresColor.value = 'yellow';
  } else {
    genresColor.value = 'red';
  }
}
relatedGenresCheck();

// functions for studio card
function checkStudio() {
  if (props.guess.studios.nodes[0].name === props.solution.studios.nodes[0].name) {
    studioColor.value = 'green';
  } else {
    studioColor.value = 'red';
  }
  return props.guess.studios.nodes[0].name;
}

// functions for series card
function relatedSeriesCheck() {
  // check if same show exactly
  if (props.guess.id === props.solution.id) {
    relatedSeries.value = 'Related';
    seriesColor.value = 'green';
    return;
  }
  // loop through related series
  for (let i = 0; i < props.guess.relations.nodes.length; i++) {
    // if the related series is the solution
    // eslint-disable-next-line
    if (props.guess.relations.nodes[i].id === props.solution.id) {
      relatedSeries.value = 'Related';
      seriesColor.value = 'green';
      return;
    }
  }
  relatedSeries.value = 'Unrelated';
  seriesColor.value = 'red';
}
relatedSeriesCheck();

</script>
<style scoped lang='scss'>
.columns {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 0.5rem;
}

.card {
  min-height: 4rem;
  align-items: center;
  justify-content: center;
  display: flex;
}

.pic {
  background-image: url();
}

.icon {
  font-size: 1.5rem;
  margin: 2px;
}

.red {
  background: rgba(255, 0, 0, 0.5);
}

.green {
  background: rgba(0, 255, 0, 0.5);
}

.yellow {
  background: rgba(255, 255, 0, 0.5);
}

.gameover {
  background: rgba(128, 128, 128, 0.5);
}
</style>
