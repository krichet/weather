import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueAwesomePaginate from "vue-awesome-paginate"

import './assets/main.css'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(VueAwesomePaginate)
app.mount('#app')