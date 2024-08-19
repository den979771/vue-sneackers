import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import App from './App.vue'
import myHome from './pages/myHome.vue'
import myFavorites from './pages/myFavorites.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'home', component: myHome },
  { path: '/favorites', name: 'favorites', component: myFavorites }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(router)

app.use(autoAnimatePlugin)

app.mount('#app')
