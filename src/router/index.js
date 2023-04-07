import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPagePresenter.jsx'
import LoginPage from '../components/LoginPresenter.jsx'
import SignUpPage from '../components/SignUpPresenter.jsx'
import Favorite from '../components/FavoritePresenter.jsx'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // path: '/',
      // name: 'home',
      path: '/home',
      component:  MainPage
    },
    {
      path: '/login',
      component:  LoginPage
    },
    {
      path: '/signup',
      component:  SignUpPage
    },
    {
      path: '/favorite',
      component: Favorite
    }
  ]


})

export default router