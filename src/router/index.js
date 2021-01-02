import Vue from 'vue'
import Router from 'vue-router'
import JGHome from '@/components/JGHome'
import JGNews from '@/components/JGNews'
import JGMatches from '@/components/JGMatches'
import JGTalks from '@/components/JGTalks'
import JGReg from '@/components/JGReg'
import JGLog from '@/components/JGLog'
import JGUser from '@/components/JGUser'

import UserInteract from '@/components/user/UserInteract'
import UserMessage from '@/components/user/UserMessage'
import UserCollect from '@/components/user/UserCollect'
import UserInfo from '@/components/user/UserInfo'
import AuthorCenter from '@/components/user/AuthorCenter'



import NewsDetail from '@/components/details/NewsDetail'
import MatchDetail from '@/components/details/MatchDetail'
import TalkDetail from '@/components/details/TalkDetail'

Vue.use(Router)

const originalPush = Router.prototype.push


Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect : '/home',
      // component: JGHome
    },
    {
      path: '/home',
      name: 'JGHome',
      component: JGHome
    },
    {
      path: '/news',
      name: 'JGNews',
      component: JGNews
    },
    {
      path:'/news/:id',
      name: 'NewsDetail',
      component : NewsDetail
    },
    {
      path: '/talk',
      name: 'JGTalks',
      component: JGTalks
    },
    {
      path: '/talk/:id',
      name: 'TalkDetail',
      component: TalkDetail
    },
    {
      path: '/match',
      name: 'JGMatches',
      component: JGMatches
    },
    {
      path: '/match/:id',
      name: 'MatchDetail',
      component : MatchDetail
    },
    {
      path: '/login',
      name: 'JGLog',
      component: JGLog
    },
    {
      path: '/register',
      name: 'JGReg',
      component: JGReg
    },
    {
      path: '/user/:userkey',
      name: 'JGUser',
      component: UserInteract
    },
    {
      path: '/center',
      component : JGUser,
      children : [
        {
          path: '/',
          redirect : 'interact',
        },
        {
          path: 'interact',
          component: UserInteract,
        },
        {
          path: 'interact/:info',
          component: UserInteract,
        },
        {
          path: 'message',
          component: UserMessage
        },
        {
          path: 'collect',
          component: UserCollect
        },
        {
          path: 'info',
          component: UserInfo
        },
        {
          path: 'author',
          component : AuthorCenter,
        }
      ]
    }
  ]
})
