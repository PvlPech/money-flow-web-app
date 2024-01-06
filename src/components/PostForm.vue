<template>
    <form @submit.prevent>
        <h4>Post Creation</h4>
        <input v-model="post.title" class="input" type="text" placeholder="Name">    
        <input v-model="post.body" class="input" type="text" placeholder="Description">
        <my-button @click="createPost" style="align-self: flex-end; margin-top: 15px;" class="btn">Create</my-button>
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
        createPost() {
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

.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
    margin-top: 15px;
}

</style>
