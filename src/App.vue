<template>
    <div class="app">
        <h1>Post Page</h1>
        <my-button
            @click="showDialog"
            style="margin: 15px 0;">
            Create Post
        </my-button>
        <my-dialog v-model:show="dialogVisible">
            <post-form 
                @create="createPost"
            />
        </my-dialog>        
        <post-list 
            :posts="posts" 
            @remove="removePost"
            v-if="!isPostsLoading"
        />
        <div v-else>Loading...</div>
    </div>    
</template>

<script lang="ts">
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import type { Post } from '@/types/Post';
import { defineComponent } from "vue";
import axios from 'axios';

export default defineComponent({
    components: {
        PostList, PostForm,    
    },
    data() {
        return {
            posts: [] as Post[],
            dialogVisible: false as boolean,
            isPostsLoading: false as boolean,
        }            
    },
    methods: {
        createPost(post: Post): void {
            this.posts.push(post);
            this.dialogVisible = false;
        },
        removePost(post: Post): void {
            this.posts = this.posts.filter(p => p.id !== post.id);
        },
        showDialog(): void {
            this.dialogVisible = true;
        },
        async fetchPosts() {
            try {
                this.isPostsLoading = true;
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10");
                this.posts = response.data;
            } catch(e: any) {
                alert(e.message);
            } finally {
                this.isPostsLoading = false;
            }
        }
    },
    mounted() {
        this.fetchPosts();
    }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
    padding: 20px;
}

</style>
