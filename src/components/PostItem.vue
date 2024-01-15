<template>
    <div class="post">
        <div>
            <div><strong>Name:</strong> {{ post.title }}</div>
            <div><strong>Description:</strong> {{ post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button 
                @click="$router.push(`/posts/${post.id}`)">
                Open
            </my-button>
            <my-button 
                @click="$emit('remove', post as Post)">
                Delete
            </my-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Post } from '@/types/Post';

export default defineComponent({
    props: {        
        post: {
            type: Object as PropType<Post>,
            required: true,
        }
    }
})
</script>

<style scoped>
.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.post__btns {
    display: flex;
}
</style>
