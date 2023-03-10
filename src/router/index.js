import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/panel/Home.vue'

function loggedInRedirectDashboard(to, from, next) {
  if (localStorage.token) {
    next('/panel');
  } else {
    next();
  }
}

function isLoggedIn(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next('/login');
  }
}

const routes = [
  {
    path:'/login',
    name:'Login',
    component: () => import('../views/Login.vue'),
    beforeEnter: loggedInRedirectDashboard,
  },
  {
    path: '/panel',
    name: 'Home',
    component: Home,
    meta:{
      requiresAuth:true
    },
    beforeEnter: isLoggedIn,
    children:[
      {
        path: '/panel/about',
        name: 'About',
        meta:{
          requiresAuth:true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/panel/About.vue')
      },
      {
        path: '/panel/profile',
        name: 'Profile',
        meta:{
          requiresAuth:true
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/panel/Profile.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    component: Home
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.requiresAuth) && !localStorage.token){
    next('/login')
    return
  }
  if(localStorage.token){
    next('/panel')
    return
  }
  next();
})*/

export default router
