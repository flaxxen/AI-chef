import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPagePresenter.jsx'
import LoginPage from '../components/LoginPresenter.jsx'
import SignUpPage from '../components/SignUpPresenter.jsx'
import Favorite from '../components/FavoritePresenter.jsx'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      component:  MainPage
    },
    {
      name: 'Login',
      path: '/login',
      component:  LoginPage
    },
    {
      name: 'Signup',
      path: '/signup',
      component:  SignUpPage
    },
    {
      name: 'Favorite',
      path: '/favorite',
      component: Favorite
    }
  ]
})

export default router