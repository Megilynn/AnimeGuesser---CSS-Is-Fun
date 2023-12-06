<template>
  <div class="home">
    Test
  </div>
  <div>
    <GameBoard />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GameBoard from '@/components/GameBoard.vue';

@Options({
  components: {
    GameBoard,
  },
})
export default class GuessingGameView extends Vue { }
</script>
