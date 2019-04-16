import Vue from 'vue'
import Router from 'vue-router'

import VtohHeroes from '@/views/VtohHeroes'
import VtohDashboard from '@/views/VtohDashboard'
import VtohHeroDetail from '@/views/VtohHeroDetail'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/heroes',
    component: VtohHeroes
  },
  {
    path: '/dashboard',
    component: VtohDashboard
  },
  // データを渡すときはnameを使わないとルーティングがおかしくなる？
  {
    path: '/detail/:id',
    name: 'detail',
    component: VtohHeroDetail
  }
]

const router = new Router({ routes })

export default router
