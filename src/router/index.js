import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GVG from '../components/gvg_reporter.vue'
import ddmenu from '../components/dropdownmenu/ddmenu.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
