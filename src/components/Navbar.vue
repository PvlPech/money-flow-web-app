<template>
    <div class="navbar">
        <div @click="$router.push('/')">Posts</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">Posts</my-button>
            <my-button @click="$router.push('/about')" style="margin-left: 20px;">About</my-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style scoped>
.navbar {
    height: 50px;
    background-color: gray;
    box-shadow: 2px 2px 4px gray;
    display: flex;
    align-items: center;
    padding: 0 15px;    
}

.navbar__btns {
    margin-left: auto;
}

</style>