<template>
    <form @submit.prevent>
        <h4>Post Creation</h4>
        <my-input 
            v-model="post.title" 
            type="text" placeholder="Name"/>
        <my-input 
            v-model="post.body" 
            type="text" 
            placeholder="Description"/>
        <my-button 
            @click="createPost" 
            style="align-self: flex-end; margin-top: 15px;" class="btn">
            Create
        </my-button>
    </form>   
</template>

<script lang="ts">
import type { Post } from '@/types/Post';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            post: {
                id: 0,
                title: '',
                body: ''
            } as Post
        }
    },
    methods: {
        createPost(): void {
            this.post.id = Date.now();
            this.$emit("create", this.post);
            this.post = {
                id: 0,
                title: "",
                body: ""
            };
        }
    }
})
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}

</style>
