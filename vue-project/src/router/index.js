import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/my-posts',
      name: 'my-posts',
      component: () => import('../views/MyPostsView.vue')
    },
    {
      path: '/edit-post/:id/:originUrl',
      name: 'edit-post',
      props: true, //renvoie le paramètre en tant que props
      component: () => import('../views/EditPostView.vue')
    },
    {
      path: '/new-post',
      name: 'new-post',
      component: () => import('../views/AddPostView.vue')
    },
    {
      path: '/post/:id',
      name: 'post',
      props: true, //renvoie le paramètre en tant que props
      component: () => import('../views/PostView.vue')
    },
    {
      path: '/profil',
      name: 'profile',
      component: () => import('../views/ProfileView.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUpView.vue')
    }
  ]
})

export default router
