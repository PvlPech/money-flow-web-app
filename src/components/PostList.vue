<template>
    <div v-if="posts.length > 0">
        <h3>List</h3>
        <transition-group name="post-list">
            <post-item 
                v-for="post in posts" 
                :post="post"
                :key="post.id"
                @remove="$emit('remove', post)"
            />
        </transition-group>
    </div>
    <h2 
        v-else 
        style="color: red;">
        The List is Empty
    </h2>
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
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active, 
.post-list-leave-active {
  transition: all 0.4s ease;
}
.post-list-enter-from, 
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.4s ease;
}
</style>
