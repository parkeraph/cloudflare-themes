<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SegmentControl from './components/SegmentControl.vue'
import Hero from './components/Hero.vue';
import { computed } from 'vue';

const heroImage = computed(() => {
  const width = Math.floor(window.innerWidth * .60);

  const imageWidth = width > 600 ? 900 : 600

  return `https://cdn.parkeraph.com/cdn-cgi/image/width=${imageWidth}/trees.jpg` //`https://picsum.photos/${width}/${height}`
})

</script>

<template>
  <div class="control">
    <SegmentControl label="Toggle Theme" default-option="theme 1" :options="['theme 1', 'theme 2']"></SegmentControl>
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

  @media (max-width: 600px) {
    .control {
      margin-top: 5rem;
    }

    .hero {
    height: 100vh;
    width: 100%;
    height: 250px;
  }
  }
</style>
