import {App} from 'vue';
 import BeautyButton from './src/Index.vue'
  //让组件通过app.use()的方式使用

  export default {
    install(app:App){
      app.component('beauty-button',BeautyButton);
    }
  }