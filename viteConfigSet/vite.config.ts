import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
//为打包后的文件提供传统浏览器兼容性支持
import legacy from '@vitejs/plugin-legacy';
import externalGlobals from "rollup-plugin-external-globals";
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
    //引入全局样式【指定传递给 CSS 预处理器的选项】
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
    },
    //自定义构建
    rollupOptions:{
      //确保外部化处理那些不想打包进库的依赖
      external:['vue'],
      plugins:[
        externalGlobals({
          vue:'Vue'
        })
      ],
      output:{
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  //服务器选项
  server:{
    //自定义代理规则
    proxy:{
      '^/upapi':{
        target:'http://192.168.29.186:21056',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upapi/, '')
      }
    }
  }
})