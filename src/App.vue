<script setup lang="ts">
import SegmentControl from './components/SegmentControl.vue'
import Hero from './components/Hero.vue';
import { computed, onMounted, ref, watch } from 'vue';
import getHost from './utils/getHost'
import axios from 'axios';
import type {IClientBranding} from './types/IClientBranding';

const clientBranding = ref<IClientBranding>({
  domain: '',
  clientName: '',
  headerText: '',
  themes: []
});

const currentTheme = ref<string>('');
const host = ref('')
const isLoading = ref<boolean>(false);
const themeCssPath = ref<string>('');

onMounted(async () => {
  isLoading.value = true;

  host.value = getHost()

  const url = `https://vjmussqaurmxqnvuzsgo.supabase.co/functions/v1/client-service?domain=${host.value}`

  const clientServiceResponse = await axios.get<IClientBranding>(url, {
        headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
            'Content-Type': 'application/json',
        }
    });

  clientBranding.value = clientServiceResponse.data;
  currentTheme.value =  clientBranding.value.themes ? clientBranding.value.themes[0].toString() : '';

  themeCssPath.value = `https://cdn.${host.value}.com/${host.value}/${currentTheme.value}/theme.css`

  isLoading.value = false;
})

const heroImage = computed(() => {

  const width = window.innerWidth;

  const imageWidth = width > 600 ? 900 : 600;
  const imageHeight = width > 600 ? window.innerHeight : 250;

  //placeholder image for development env
  //@ts-ignore
  if(process.env.NODE_ENV === "development") return `https://pub-194f664d822f48139238d4445b80c7f8.r2.dev/parkeraph/${currentTheme.value}/header.jpg`

  return `https://cdn.${host.value}.com/cdn-cgi/image/fit=crop,height=${imageHeight},width=${imageWidth}/${host.value}/${currentTheme.value}/header.jpg`
})

const handleThemeSwitch = (option: string) => {
  currentTheme.value = option;
  themeCssPath.value = `https://cdn.hamptonux.com/${host.value}/${currentTheme.value}/theme.css`
}

watch(themeCssPath, (newValue, oldValue) => {
  const existingLink = document.querySelector(`link[href="${oldValue}"]`);

  console.log(existingLink)

  if(existingLink)(existingLink as HTMLLinkElement).remove();

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = newValue;
  link.type = 'text/css';

  document.head.appendChild(link);
})

</script>

<template>

  <div v-if="!isLoading" class="content">

    <div class="title">
      <h1>{{clientBranding.clientName}}</h1>
      <h2>{{clientBranding.headerText}}</h2>
    </div>

    <SegmentControl
      label="Theme"
      :default-option="currentTheme"
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
