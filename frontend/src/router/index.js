import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfessionalHelp from '../views/ProfessionalHelp.vue'
import CreatePost from '../views/CreatePost.vue'
import UserProfile from '../views/UserProfile.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },

    {
      path: '/account',
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

    {
      path: '/account/sign-up',
      name: 'Sign Up',
      component: SignUp
    },

    {
      path: '/account/login',
      name: 'Log In',
      component: Login
    }
  ]
})

export default router

