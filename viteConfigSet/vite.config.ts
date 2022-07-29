import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
//为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy';
import {resolve} from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    vue(),
    legacy({
      targets:['defaults','not IE 11']
    })
  ],
  resolve:{
    //@的使用： import HelloWorld from '@/components/HelloWorld.vue'
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  css:{
    modules:{
      //.module.css里面的样式如： .apply-color -> applyColor
      localsConvention:'camelCaseOnly'
    }
  },
  build:{
  }
})
