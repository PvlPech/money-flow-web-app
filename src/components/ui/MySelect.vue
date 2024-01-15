<template>
    <select :value="modelValue" @change="changeOption">
        <option disabled value="">Choose the value</option>
        <option 
            v-for="option in options"
            :key="option.id"
            :value="option.id">
            {{ option.name }}
        </option>
    </select>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Option } from '@/types/Option';

export default defineComponent({
    props: {
        modelValue: String,
        options: {
            type: Array as PropType<Option[]>,
            default: () => {}
        }
    }, methods: {
        changeOption(event: Event) {
            this.$emit("update:modelValue", event.target.value); //String -> Number
        }
    }    
})
</script>

<style scoped>

</style>