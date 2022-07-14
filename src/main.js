import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

createApp(App).mount('#app')

const p = new Promise(()=>{
  console.log('===================1')
})
