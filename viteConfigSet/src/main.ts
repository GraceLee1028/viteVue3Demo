import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import lfUi from './packages';
const app = createApp(App)
app.use(lfUi)
app.mount('#app')
