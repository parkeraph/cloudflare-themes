<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SegmentControl from './components/SegmentControl.vue'
import Hero from './components/Hero.vue';
import { computed } from 'vue';

const heroImage = computed(() => {
  const width = Math.floor(window.innerWidth * .60);
  const height = Math.floor(window.innerHeight);
  return `https://picsum.photos/${width}/${height}`
})

</script>

<template>
  <div class="control">
    <SegmentControl label="Toggle Theme" default-option="theme 1" :options="['theme 1', 'theme 2']"></SegmentControl>
    <p>Theme images are provided by <a href="https://picsum.photos/">https://picsum.photos/</a></p>
  </div>
  <Hero class="hero" :image="heroImage"></Hero>
</template>

<style scoped>
  .control {
    width: 70%;
    display: flex;
    padding-left: 4rem;
    justify-content: center;
    flex-direction: column;
    align-items: start;
    align-content: start;
    gap: 1rem;
  }

  p {
    font-size: .75rem;
  }

  .hero {
    height: 100vh;
    width: 60%;
  }
</style>
