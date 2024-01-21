<template>
    <div>
        <h1>Post Page</h1>
        <my-input
            v-focus
            :model-value="searchQuery"
            @update:model-value="setSearchQuery"
            placeholder="Search"
        />
        <div class="app__btns">
            <my-button
                @click="showDialog">
                Create Post
            </my-button>
            <my-select
                :model-value="selectedSort"
                @update:model-value="setSelectedSort"
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
        <div v-intersection="fetchMorePosts"></div>
    </div>    
</template>

<script lang="ts">
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import type { Post } from '@/types/Post';
import { defineComponent } from "vue";
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default defineComponent({
    components: {
        PostList, PostForm,    
    },
    data() {
        return {
            dialogVisible: false as boolean,            
        }            
    },
    methods: {
        ...mapMutations({
            setPage: "post/setPage",
            setSearchQuery: "post/setSearchQuery",
            setSelectedSort: "post/setSelectedSort"
        }),
        ...mapActions({
            fetchMorePosts: "post/fetchMorePosts",
            fetchPosts: "post/fetchPosts"
        }),
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
    },
    mounted() {
        this.fetchPosts();
    },
    computed: { 
        ...mapState({
            posts: state => state.post.posts,
            isPostsLoading: state => state.post.isPostsLoading,
            selectedSort: state => state.post.selectedSort,
            searchQuery: state => state.post.searchQuery,
            page: state => state.post.page,
            limit: state => state.post.limit,
            totalPages: state => state.post.totalPages,
            sortOptions: state => state.post.sortOptions
        }),
        ...mapGetters({
            sortedPosts: "post/sortedPosts",
            sortedAndSearchedPosts: "post/sortedAndSearchedPosts" 
        })
    },
})
</script>

<style>
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
