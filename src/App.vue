<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SegmentControl from './components/SegmentControl.vue'
import Hero from './components/Hero.vue';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

const themeConfig = ref({});

onMounted(async () => {
  console.log(window.location.hostname)
  const hostnameParts = window.location.hostname.split('.');
  console.log(hostnameParts[1])

  const url = `api.parkeraph.com/?domain=${hostnameParts[1]}`
  themeConfig.value = await axios.get(url);
  console.log(themeConfig)
})

const heroImage = computed(() => {

  const width = Math.floor(window.innerWidth * .60);

  const imageWidth = width > 600 ? 900 : 600

  //placeholder image for development env
  //if(process.env.NODE_ENV === "development") return `https://picsum.photos/${width}/${window.innerHeight}`

  return `https://cdn.parkeraph.com/cdn-cgi/image/width=${imageWidth}/trees.jpg` //`https://picsum.photos/${width}/${height}`
})

</script>

<template>

  <div class="content">
    <div class="title">
      <h1>Hampton Design</h1>
      <h2>Welcome to my UX design portfolio!</h2>
    </div>
    <SegmentControl label="Theme" default-option="theme 1" :options="['theme 1', 'theme 2']"></SegmentControl>
  </div>
  <Hero class="hero" :image="heroImage"></Hero>
</template>

<style scoped>
  .content {
    width: 70%;
    display: flex;
    padding-left: 4rem;
    justify-content: center;
    flex-direction: column;
    align-items: start;
    align-content: start;
    gap: 2rem;

  }

  h1, h2 {
    margin: 0
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
