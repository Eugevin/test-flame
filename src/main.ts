import { createApp } from 'vue'
import 'milligram/dist/milligram.min.css'
import './styles/main.scss'
import App from './App.vue'
import router from './router/router.ts'
import store from './store/store.ts'

createApp(App).use(router).use(store).mount('#app')
