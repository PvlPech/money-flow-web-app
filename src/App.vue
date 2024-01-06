<template>
    <div class="app">
        <post-form @create="createPost"></post-form>
        <post-list :posts="posts"></post-list>    
    </div>    
</template>

<script lang="ts">
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import type { Post } from '@/types/Post';
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        PostList, PostForm
    },
    data() {
        return {
            posts: [
                {id: 1, title: 'TypeScript 1', body: 'Description 1'},
                {id: 2, title: 'TypeScript 2', body: 'Description 2'},
                {id: 3, title: 'TypeScript 3', body: 'Description 3'},
                {id: 4, title: 'TypeScript 4', body: 'Description 4'},
            ] as Post[],
        }            
    },
    methods: {
        createPost(post: Post) {
            this.posts.push(post);
        },
    }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: borer-box;
}

.app {
    padding: 20px;
}

</style>
