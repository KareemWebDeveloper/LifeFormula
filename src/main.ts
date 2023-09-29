import './assets/main.css'
import { plugin, defaultConfig } from '@formkit/vue'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'
import PrimeVue from 'primevue/config';
import "./assets/theme.css";
// import 'primevue/resources/primevue.min.css'
// import 'primevue/resources/primevue.css'
import 'primeicons/primeicons.css';

const app = createApp(App)

app.use(router)
app.use(PrimeVue)
app.use(plugin, defaultConfig)

app.mount('#app')
