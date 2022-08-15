import { createApp } from 'vue'
import './style.css'
import App from './App.vue';
// import LeeImageUI from 'lee-image-ui';
import LeeImageUi from './packages/index'
import 'lee-image-ui/style.css';

const app = createApp(App)
app.use(LeeImageUi);
app.mount('#app')
