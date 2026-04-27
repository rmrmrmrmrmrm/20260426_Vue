import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'// 1. router/index.js をインポートする

const app = createApp(App)
app.use(router)// 2. app.use(router) を実行してルーターを登録する
app.mount('#app')// 3. 最後にマウントする