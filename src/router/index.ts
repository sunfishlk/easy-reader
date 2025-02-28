import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginVue from '@/views/Login.vue'
import { useState } from '@/composable/api/useState'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/home',
      name: 'articleList',
      component: () => import('../views/ArticleList.vue')
    },
    {
      path: '/home/:id',
      name: 'articleContent',
      component: () => import('../views/ArticleContent.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

//路由前置守卫
router.beforeEach((to, from) => {
  if ((from.path === '/') && to.path === '/home'){
    useState().then((res)=>{
      console.log(res,'前置守卫');
      if(!res){
        router.push('/');
      }
    }).catch((err)=>{
      console.log(err);
    })
  }
})

//若已经登陆则不显示登陆界面，直接跳转'/home'界面
useState().then((res)=>{
  if(res){
    router.push('/home');
  }
}).catch((err)=>{
  console.log(err);
})

export default router
