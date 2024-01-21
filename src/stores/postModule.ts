import type { Post } from '@/types/Post';
import type { Option } from '@/types/Option';
import axios from 'axios';

export const postModule = {
    state: () => ({
        posts: [] as Post[],
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
    }),
    getters: {
        sortedPosts(state: any): Post[] {
            if (state.selectedSort === "") {
                return state.posts;                
            }
            return [...state.posts].sort((a: Post, b: Post) => a[state.selectedSort].localeCompare(b[state.selectedSort]));
        },
        sortedAndSearchedPosts(state: any, getters: any): Post[] {
            return getters.sortedPosts.filter((post: Post) => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
        } 
    },
    mutations: {
        setPosts(state: any, posts: Post[]) {
            state.posts = posts;
        },
        setLoading(state: any, loading: boolean) {
            state.isPostsLoading = loading;
        },
        setSelectedSort(state: any, selectedSort: boolean) {
            state.selectedSort = selectedSort;
        },
        setSearchQuery(state: any, searchQuery: string) {
            state.searchQuery = searchQuery;
        },
        setPage(state: any, page: number) {
            state.page = page;
        },
        setTotalPages(state: any, totalPages: number) {
            state.totalPages = totalPages;
        },
    },
    actions: {
        async fetchPosts({state, commit}): Promise<void> {
            try {
                commit("setLoading", true);
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _limit: state.limit,
                        _page: state.page
                    }
                });
                commit("setTotalPages", Math.ceil(response.headers["x-total-count"] / state.limit));
                commit("setPosts" ,response.data);
            } catch(e: any) {
                alert(e.message);
            } finally {
                commit("setLoading", false);
            }
        },
        async fetchMorePosts({state, commit}): Promise<void> {
            try {
                commit("setPage", state.page+1);
                const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                    params: {
                        _limit: state.limit,
                        _page: state.page
                    }
                });
                commit("setTotalPages", Math.ceil(response.headers["x-total-count"] / state.limit));
                commit("setPosts", [...state.posts, ...response.data]);
            } catch(e: any) {
                alert(e.message);
            }
        },
    },
    namespaced: true
}