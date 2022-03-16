import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,Dropdown,DropdownMenu,DropdownItem,Col,Row,Card,Table,TableColumn,
  Container,Header,Aside,Main,Menu,Submenu,MenuItemGroup,MenuItem,Breadcrumb,
  BreadcrumbItem,Tag,Form,FormItem,Input,Select,Switch,DatePicker,Option,
  Dialog,Pagination,MessageBox,Message,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

import './assets/config.less'

import http from 'axios'
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message


import '@/api/mock.js' 

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Dropdown)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Col)
Vue.use(Row)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Dialog)
Vue.use(Pagination)


router.beforeEach((to,form,next)=>{
   store.commit('getToken')
   const token = store.state.user.token;
   if(!token && to.name !== 'login'){
      next({name:'login'})
   }else if(token && to.name === 'login'){
      next({name:'home'})
   }else{
      next()
   }
})



new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  },
}).$mount('#app')
