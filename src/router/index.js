import Vue from 'vue'
import VueRouter from 'vue-router'
//import Main from '../views/Main.vue'

Vue.use(VueRouter)


//路由重复问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {undefined
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Main',
    component:()=>import('../views/Main.vue'),
    redirect:'/home',
    children:[
      //  {
      //    path:'/home',
      //    name:'home',
      //    component:()=>import('../views/Home/index.vue')
      //  },
      //  {
      //   path:'/user',
      //   name:'user',
      //   component:()=>import('../views/User/index.vue')
      // },
      // {
      //   path:'/mall',
      //   name:'mall',
      //   component:()=>import('../views/Mall/index.vue')
      // },
      // {
      //   path:'/page1',
      //   name:'page1',
      //   component:()=>import('../views/Other/pageOne.vue')
      // },
      // {
      //   path:'/page2',
      //   name:'page2',
      //   component:()=>import('../views/Other/pageTwo.vue')
      // },
    ]
  },
  {
     path:'/login',
     name:'login',
     component:()=>import('../views/Login/login.vue')
  },
 
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
