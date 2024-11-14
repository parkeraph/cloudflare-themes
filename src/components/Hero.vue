<script setup lang="ts">
    import {ref, onMounted} from "vue"

    const {image} = defineProps<{image: string}>();

</script>

<template>

   <div :style="{'backgroundImage': 'url('+image+')'}" class="hero">
    
   </div>


</template>

<style scoped>
</style>
