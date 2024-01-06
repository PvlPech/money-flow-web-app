<template>
    <div>
        <h3>List</h3>
        <post-item v-for="post in posts" :post="post"></post-item>
    </div> 
</template>

<script lang="ts">
import type { Post } from '@/types/Post';
import PostItem from './PostItem.vue';    
import { defineComponent, type PropType } from 'vue';
export default defineComponent({
    components: { PostItem },
    props: {
        posts: {
            type: Array as PropType<Post[]>,
            required: true,
        }
    }
})
</script>

<style scoped>
</style>
