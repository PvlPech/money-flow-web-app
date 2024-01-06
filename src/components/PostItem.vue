<template>
    <div class="post">
        <div>
            <div><strong>Name:</strong> {{ post.title }}</div>
            <div><strong>Description:</strong> {{ post.body }}</div>
        </div>
        <div class="post__btns">
            <my-button>Delete</my-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Post } from '@/types/Post';

export default defineComponent({
    props: {        
        post: Object as PropType<Post>,
        required: true,
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
</style>
