import { createApp } from 'vue'
import App from './App.jsx'
import router from './router'
import { initializeApp } from "firebase/app";
import './assets/main.css'


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase


// Import Bootstrap an BootstrapVue CSS files (order is important)
const app = createApp(App)

app.use(router)

app.mount('#app')
