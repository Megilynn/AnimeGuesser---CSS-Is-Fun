<template>
  <div class='home'>
    <Suspense>
      <GameContainer class="game board" />
    </Suspense>
  </div>
</template>

<script setup lang='ts'>
import GameContainer from '@/components/GameContainer.vue';

</script>
<style scoped lang='scss'>
</style>
