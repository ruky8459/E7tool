import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GVG from '@/components/gvg_reporter.vue'
import ddmenu from '@/components/dropdownmenu/ddmenu.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', //根目錄即初始頁面
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: 'GVG'//自動導向到GVG組件
    },
    {
        path: '/gvg',
        component: GVG
    },
    {
        path: '/ddmenu',
        component: ddmenu
    }
  ]
})
