import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../components/MainPagePresenter.jsx'
import LoginPage from '../components/LoginPresenter.jsx'
import SignUpPage from '../components/SignUpPresenter.jsx'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component:  MainPage
    },
    {
      path: '/login',
      component:  LoginPage
    },
    {
      path: '/signup',
      component:  SignUpPage
    }
  ]


})

export default router