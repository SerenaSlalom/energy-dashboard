import { createRouter, createWebHistory } from 'vue-router'
import StoryView from '@/views/StoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', name: 'story', component: StoryView }],
})

export default router
