<template>
    <div class="app">
        <h1>Post Page</h1>
        <my-input
            v-model="searchQuery"
            placeholder="Search"
        />
        <div class="app__btns">
            <my-button
                @click="showDialog">
                Create Post
            </my-button>
            <my-select
                v-model="selectedSort"
                :options="sortOptions"
            />
        </div>
        
        <my-dialog v-model:show="dialogVisible">
            <post-form 
                @create="createPost"
            />
        </my-dialog>        
        <post-list 
            :posts="sortedAndSearchedPosts" 
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
import type { Option } from '@/types/Option';
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
            selectedSort: "" as string,
            searchQuery: "" as string,
            sortOptions: [
                {id: "body", name: "Body"},
                {id: "title", name: "Title"},                
            ] as Option[],
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
        },
    },
    mounted() {
        this.fetchPosts();
    },
    computed: {
        sortedPosts(): Post[] {
            if (this.selectedSort === "") {
                return this.posts;                
            }
            return [...this.posts].sort((a: Post, b: Post) => a[this.selectedSort].localeCompare(b[this.selectedSort]));
        },
        sortedAndSearchedPosts(): Post[] {
            return this.sortedPosts.filter((post: Post) => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
        } 
    },
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

.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

</style>
