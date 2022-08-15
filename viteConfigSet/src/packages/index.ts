import {App} from 'vue';
import ImageShadow from './ImageShadow'
import BeautyButton from './BeautyButton'
const components = [ImageShadow,BeautyButton]

export default {
  install(app:App,options:any){
    components.forEach((component)=>{
      app.use(component)
    })
  }
};