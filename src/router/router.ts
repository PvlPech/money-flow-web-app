import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/Main.vue';
import Posts from '@/views/Posts.vue';
import PostDetails from '@/views/PostDetails.vue';
import PostsWithStore from '@/views/PostsWithStore.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: Main
    },
    {
        path: "/posts",
        name: "posts",
        component: Posts
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("@/views/About.vue")
    },
    {
        path: "/posts/:id",
        name: "post-details",
        component: PostDetails
    },
    {
      path: "/store",
      name: "post-woth-store",
      component: PostsWithStore
  },
  ]
})

export default router;
