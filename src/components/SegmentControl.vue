<script setup lang="ts">
    import {ref, onMounted} from "vue"

    const selectedOption = ref<number>(0);

    const {options, defaultOption, label} = defineProps<{options: Array<string>, defaultOption: string, label: string}>();
    //const emits = defineEmits<{change: [option: string]}>();

    onMounted(() => {
        selectedOption.value = options.indexOf(defaultOption);
    })

    const isActive = (option: string) => {
        return options.indexOf(option) === selectedOption.value;
    }

    const toggleSegment = (option: string) => {
        return selectedOption.value = options.indexOf(option);
    };

</script>

<template>
    <div class="segment-control-wrapper">
        <h3>{{ label }}</h3>


        <Transition-Group name="segment-transition" tag="div" class="segment-control">
            <button v-for="(option, idx) in options" :key="option" class="segment" :class="{'active-segment': isActive(option)}" @click="toggleSegment(option)">
                {{ option }}
            </button>
        </Transition-Group>

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
        border: solid 1px #e2dfdfd7;
        padding: .1rem .1rem .1rem  .1rem;
        border-radius: 8px;
        margin-top: .5rem;
        max-width: fit-content;
        font-weight: 500;
    }

    .segment {
        background-color: transparent;
        border: none;
        color: #EBEBEBA3;
        transition: all .5s ease;
        border-radius: 5px;
    }

    .active-segment {
        color: black;
        background-color: #e2dfdfd7;

    }

    .segment:hover {
        background-color: #e2dfdf3f;

    }

</style>
