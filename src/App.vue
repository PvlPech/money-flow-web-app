<template>
    <navbar></navbar>
    <div class="app">        
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
    components: { Navbar }
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