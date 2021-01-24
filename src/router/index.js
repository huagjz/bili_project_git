import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [{
  path: '/',
  redirect: '/login',
  component: () => import(/* webpackChunkName: "about" */ '../components/Login.vue')
},
{
  path: '/login',
  name: 'Login',
  component: () => import(/* webpackChunkName: "login" */ '../components/Login.vue')
},
{
  path: '/home',
  name: 'Home',
  component: () => import(/* webpackChunkName: "home" */ '../components/Home.vue'),
  redirect: '/welcome',
  children: [{
    path: '/welcome',
    name: 'Welcome',
    component: () => import(/* webpackChunkName: "login" */ '../components/Welcome.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "login" */ '../components/user/Users.vue')
  },
  {
    path: '/rights',
    name: 'Rights',
    component: () => import(/* webpackChunkName: "login" */ '../components/power/Rights.vue')
  },
  {
    path: '/roles',
    name: 'Roles',
    component: () => import(/* webpackChunkName: "login" */ '../components/power/Roles.vue')
  }]
}
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();

  const tokenstr = window.sessionStorage.getItem('token')

  if (!tokenstr) return next('/login')

  next();
})

export default router
