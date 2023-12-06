<template>
  <div class="container">
    <div class="heroImage">
      <img alt="test" :src="solution.coverImage.large">
    </div>
    <div class="statusMessage">
      <div v-if="status === 'win'">
        <h1>You Win</h1>
      </div>
      <div v-if="status === 'lose'">
        <h1>You Lose</h1>
      </div>
    </div>
    <div class="gamecolumn">
      <div class='columns'>
        <div class='column'>Title</div>
        <div class='column'>Genres</div>
        <div class='column'>Popularity</div>
        <div class='column'>Source</div>
        <div class='column'>Season</div>
        <div class='column'>Studio</div>
        <div class='column'>Related Franchise</div>
      </div>
      <div class="columns">
        <GuessColumn :guess='solution' :solution='solution' />
      </div>
    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref, defineProps } from 'vue';
import GuessColumn from './GuessColumn.vue';

const props = defineProps(['solution', 'status']);
</script>
<style scoped lang='scss'>
  h1 {
    color: #2c3e50;
    font-size: 50px;
    font-weight: 900;
    text-align: center;
  }
  .gamecolumn {
    background-color: whitesmoke;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
  }
</style>
