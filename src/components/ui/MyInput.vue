<template>
    <input 
        :value="modelValue"
        @input="updateInput" 
        class="input" 
        type="text">
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        modelValue: String,
    },
    methods: {
        updateInput(event: Event): void {
            this.$emit("update:modelValue", event.target.value);
        }
    }
})
</script>

<style scoped>
.input {
    width: flex;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>