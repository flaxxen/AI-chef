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
const firebaseConfig = {
    apiKey: "AIzaSyCd4seLbm8MPfweos2jGJp8VE1lgbMNffU",
    authDomain: "ai-chef-ad89c.firebaseapp.com",
    databaseURL: "https://ai-chef-ad89c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "ai-chef-ad89c",
    storageBucket: "ai-chef-ad89c.appspot.com",
    messagingSenderId: "167471127801",
    appId: "1:167471127801:web:845c25bc7d846819105628",
    measurementId: "G-8Q25SH9EYR"
};

// Initialize Firebase
initializeApp(firebaseConfig);


// Import Bootstrap an BootstrapVue CSS files (order is important)
const app = createApp(App)

app.use(router)

app.mount('#app')
