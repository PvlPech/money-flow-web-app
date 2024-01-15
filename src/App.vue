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
        <div  ref="observer"></div>
        <!-- <div class="page__wrapper">
            <div 
                v-for="pageNum in totalPages"
                :key="pageNum"
                class="page"
                :class="{
                    'current-page': pageNum === page
                }"
                @click="changePage(pageNum)"
                >
                {{ pageNum }}
            </div>
        </div>  -->
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
            page: 1 as number,
            limit: 10 as number,
            totalPages: 0 as number,
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
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _limit: this.limit,
                        _page: this.page
                    }
                });
                this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
                this.posts = response.data;
            } catch(e: any) {
                alert(e.message);
            } finally {
                this.isPostsLoading = false;
            }
        },
        // changePage(pageNum: number): void {
        //     this.page = pageNum;
        // },
        async loadMorePosts() {
            try {
                this.page += 1;
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _limit: this.limit,
                        _page: this.page
                    }
                });
                this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
                this.posts = [...this.posts, ...response.data];
            } catch(e: any) {
                alert(e.message);
            }
        },
    },
    mounted() {
        this.fetchPosts();
        const options = {
            rootMargin: "0px",
            threshold: 1.0,
        } as IntersectionObserverInit;
        const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): IntersectionObserverCallback => {
            if(entries[0].isIntersecting && this.page < this.totalPages) {
                this.loadMorePosts();
            }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(this.$refs.observer as Element);
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
    watch: {
        // page(): void {
        //     this.fetchPosts();
        // }
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

.app__btns {
    margin: 15px 0;
    display: flex;
    justify-content: space-between;
}

.page__wrapper {
    display: flex;
    margin-top: 15px;
}

.page {
    border: 1px solid black;
    padding: 10px;
}

.current-page {
    border: 2px solid teal;
}

</style>
