import Vue from 'vue'
// 引入路由
import VueRouter from 'vue-router'

// 引入组件
import Login from '../components/login/Login.vue'
import Home from '../components/home/Home.vue'
import Users from '../components/users/Users.vue'
import Rights from '../components/rights/Rights.vue'
import Roles from '../components/roles/Roles.vue'
import Category from '../components/category/Category.vue'
import Goods from '../components/goods/Goods.vue'
import GoodsAdd from '../components/goods/GoodsAdd.vue'

// use安装一下
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home',
      component: Home,
      children: [
        // { path: '/users/:page?', component: Users },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Category },
        { path: '/goods', component: Goods },
        { path: '/goods-add', component: GoodsAdd }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})

// 导出 路由
export default router
