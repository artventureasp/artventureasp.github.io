import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfessionalHelp from '../views/ProfessionalHelp.vue'
import CreatePost from '../views/CreatePost.vue'
import UserProfile from '../views/UserProfile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },

    {
      path: '/my-profile',
      name: 'My Profile',
      component: UserProfile
    },

    {
      path: '/create-post',
      name: 'Create a Post',
      component: CreatePost
    },

    {
      path: '/professional-help',
      name: 'Professional Help',
      component: ProfessionalHelp
    },
  ]
})

export default router

