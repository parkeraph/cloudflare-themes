<script setup lang="ts">
    import {ref, onMounted} from "vue"

    const selectedOption = ref<number>(0);

    const {options, defaultOption, label} = defineProps<{options: Array<string>, defaultOption: string, label: string}>();
    const emit = defineEmits();


    onMounted(() => {
        if(options) selectedOption.value = options.indexOf(defaultOption);
    })

    const isActive = (option: string) => {
        return options.indexOf(option) === selectedOption.value;
    }

    const toggleSegment = (option: string) => {
        emit('change', option)
        return selectedOption.value = options.indexOf(option);
    };

</script>

<template>
    <div class="segment-control-wrapper">
        <h4>{{ label }}</h4>


        <div class="segment-control">
            <button v-for="(option, idx) in options" :key="option" class="segment" :class="{'active-segment': isActive(option)}" @click="toggleSegment(option)">
                {{ option }}
            </button>
        </div>

    </div>
</template>

<style scoped>
    .segment-control-wrapper {
        display:flex;
        flex-direction: column;
    }

    .segment-control {
        display: flex;
        gap: .5rem;
        border: solid 1px;
        border-color: var(--color-border);
        padding: .1rem .1rem .1rem  .1rem;
        border-radius: 7px;
        margin-top: .5rem;
        max-width: fit-content;
        font-weight: 500;
    }

    .segment {
        background-color: transparent;
        border: none;
        color: var(--color-text);
        transition: all .5s ease;
        border-radius: 4px;
    }

    .active-segment {
        color: black;
        background-color: var(--color-affordance);

    }

    .segment:hover {
        background-color: var(--color-affordance-50);

    }

</style>
