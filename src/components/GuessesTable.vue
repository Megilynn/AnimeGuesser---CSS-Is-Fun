<template>
  <div class='guesses container'>
    <div class='guesses'>
      <div class='columns'>
        <div class='column'>Title</div>
        <div class='column'>Genres</div>
        <div class='column'>Popularity</div>
        <div class='column'>Source</div>
        <div class='column'>Season</div>
        <div class='column'>Studio</div>
        <div class='column'>Related Franchise</div>
      </div>
      <div class='columns guesses' v-for='guess in listOfGuesses' :key='guess.id'>
        <GuessColumn :guess='guess' :solution='solution' />
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref, defineProps } from 'vue';
import GuessColumn from './GuessColumn.vue';

// props
const props = defineProps(['guesses', 'selected', 'solution']);
const listOfGuesses = ref(props.guesses);

</script>
<style lang='scss'>
li {
  list-style-type: none;
}

</style>
