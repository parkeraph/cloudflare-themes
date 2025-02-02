<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SegmentControl from './components/SegmentControl.vue'
import Hero from './components/Hero.vue';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';

const clientBranding = ref({});
const currentTheme = ref("");
const host = ref("")

onMounted(async () => {
  console.log(window.location.hostname)
  const hostnameParts = window.location.hostname.split('.');
  host.value = hostnameParts[1];

  const url = `https://vjmussqaurmxqnvuzsgo.supabase.co/functions/v1/client-service?domain=${host.value}`

  let clientServiceResponse = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            'Content-Type': 'application/json',
        }
    });

  clientBranding.value = clientServiceResponse.data;
  currentTheme.value = clientBranding.value.themes[0];
})

const heroImage = computed(() => {

  const width = Math.floor(window.innerWidth * .60);

  const imageWidth = width > 600 ? 900 : 600

  //placeholder image for development env
  //if(process.env.NODE_ENV === "development") return `https://picsum.photos/${width}/${window.innerHeight}`

  return `https://cdn.parkeraph.com/cdn-cgi/image/width=${imageWidth}/${host.value}/${currentTheme.value}/header.jpg` 
})

const handleThemeSwitch = (option: String) => {
  console.log("switch!", option)
}

</script>

<template>

  <div class="content">

    <div class="title">
      <h1>{{clientBranding.client_name}}</h1>
      <h2>{{clientBranding.header_text}}</h2>
    </div>

    <SegmentControl 
      label="Theme" 
      :default-option="clientBranding.themes ? clientBranding.themes[0] : ''" 
      :options="clientBranding.themes" 
      @change="handleThemeSwitch">
    </SegmentControl>

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
