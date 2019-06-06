import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import VueFrame from '@/view/VueFrame'
import Comment from '@/view/Comment'
import Faq from '@/view/Faq'
import AboutUs from '@/view/AboutUs'
import Login from '@/page/login'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/Comment',
      name: 'comment',
      component: Comment,
      meta: {
        title: '吐槽大会'
      }
    },
    {
      path: '/VueFrame',
      name: 'vueframe',
      component: VueFrame,
      meta: {
        title: '前端新闻'
      }
    },
    {
      path: '/Faq',
      name: 'faq',
      component: Faq,
      meta: {
        title: '常见问题'
      }
    },
    {
      path: '/AboutUs',
      name: 'aboutus',
      component: AboutUs,
      meta: {
        title: '我的故事'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/index',
      component: () => import('@/page/index'),
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          component: () => import('@/page/home.vue'),
          meta: {
            title: '后台首页'
          }
        },
        {
          path: '/adduser',
          component: () => import('@/page/adduser.vue'),
          meta: {
            title: '添加用户'
          }
        },
        {
          path: '/getuser',
          component: () => import('@/page/getuser.vue'),
          meta: {
            title: '用户查询'
          }
        },
        {
          path: '/new',
          component: () => import('@/page/new.vue'),
          meta: {
            title: '添加前端框架'
          }
        },
        {
          path: '/newList',
          component: () => import('@/page/newList.vue'),
          meta: {
            title: '前端框架查询'
          }
        },
        {
          path: '/question',
          component: () => import('@/page/question.vue'),
          meta: {
            title: '添加问题'
          }
        },
        {
          path: '/questionList',
          component: () => import('@/page/questionList.vue'),
          meta: {
            title: '问题查询'
          }
        },
        {
          path: '/manageaboutus',
          component: () => import('@/page/aboutus.vue'),
          meta: {
            title: '添加我的故事'
          }
        },
        {
          path: '/aboutusList',
          component: () => import('@/page/aboutusList.vue'),
          meta: {
            title: '我的故事查询'
          }
        },
        {
          path: '/managecomment',
          component: () => import('@/page/comment.vue'),
          meta: {
            title: '吐槽大会查询'
          }
        },
        {
          path: '/menu',
          component: () => import('@/page/menu.vue'),
          meta: {
            title: '菜单设置'
          }

        },
        {
          path: '/menuList',
          component: () => import('@/page/menuList.vue'),
          meta: {
            title: '菜单列表'
          }
        }
      ]
    }
  ]
})
