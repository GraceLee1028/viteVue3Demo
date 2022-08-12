import {App} from 'vue';
import ImageShadow from './ImageShadow'
const components = [ImageShadow]

export default {
  install(app:App,options:any){
    components.forEach((component)=>{
      app.use(component)
    })
  }
};