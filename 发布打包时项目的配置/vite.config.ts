import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
//为打包后的文件提供传统浏览器兼容性支持
// import legacy from '@vitejs/plugin-legacy';
// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    vue(),
    // legacy({
    //   targets:['defaults','not IE 11']
    // })
  ],
  resolve:{
    //@的使用： import HelloWorld from '@/components/HelloWorld.vue'
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  },
  css:{
    modules:{
      //.module.css里面的样式如： .apply-color -> applyColor
      localsConvention:'camelCaseOnly'
    }
  },
  build:{
    lib:{
      entry:path.resolve(__dirname,"src/packages/index.ts"),
      name:'LeeImageUi',
      fileName:(format)=>`lee-image-ui.${format}.js`
    },
    rollupOptions:{
      //确保外部化处理那些你不想打包进库的依赖
      external:['vue'],
      output:{
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals:{
          vue:'Vue'
        }
      }
    }
  }
})