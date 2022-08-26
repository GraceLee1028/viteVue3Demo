import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
//为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy';
//前缀
import autoprefixer from 'autoprefixer';
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
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },

  css:{
    postcss:{
      plugins:[autoprefixer],
    },
    //引入全局样式
    preprocessorOptions:{
      scss:{
        // additionalData:"@import './assets/style/mixin.scss'"
        additionalData:"$primary:#230987;"
      }
    },
    modules:{
      //.module.css里面的样式如： .apply-color -> applyColor
      localsConvention:'camelCaseOnly'
    }
  },
  build:{
    // 生产环境移除console
    terserOptions:{
      compress:{
        drop_console:true,
        drop_debugger:true
      }
    }
  }
})