import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfessionalHelp from '../views/ProfessionalHelp.vue'
import CreatePost from '../views/CreatePost.vue'
import UserProfile from '../views/UserProfile.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import EditProfile from '@/views/EditProfile.vue';
import Feed from '@/views/Feed.vue';
import { useUserStore } from "@/stores/user";

const authGuard = () => {
  const userStore = useUserStore();
  if (!userStore.user) {
    return { path: '/account/login' };
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/feed',
      name: 'Feed',
      component: Feed,
      beforeEnter: [authGuard],
    },
    {
      path: '/account',
      beforeEnter: [authGuard],
      children: [
        {
          path: '',
          name: 'My Profile',
          component: UserProfile,
        },
        {
          path: ':id',
          name: 'User Profile',
          component: UserProfile,
        },
      ],
    },
    {
      path: '/account/edit',
      name: 'Edit Profile',
      component: EditProfile,
      beforeEnter: [authGuard],
    },

    {
      path: '/create-post',
      name: 'Create a Post',
      component: CreatePost,
      beforeEnter: [authGuard],
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

