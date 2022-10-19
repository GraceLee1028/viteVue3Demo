# viteVue3Demo
## 1. 搭建vite项目
```
# 创建项目
npm init vite@latest
# 安装依赖
cd 项目名称
npm install
# 启动
npm run dev
# 打包
npm run build
# 预览打包结果
npm run preview
```
## 2. 设置vite.config.js的配置
> css的*.module.css的用法：
任何以 .module.css 为后缀名的 CSS 文件都被认为是一个 CSS modules 文件。导入这样的文件会返回一个相应的模块对象：
```
# common.module.css
.text-red{
  color:red;
}
# app.vue
import classes from './assets/style/common.module.css'
document.querySelector('body')!.className = classes.textRed;

# 注释
import classes from './assets/style/common.module.css'// 样式将会注入页面
// import classes from './assets/style/common.module.css?inline'// 样式不会注入页面，当前方式使用时存在问题暂时不管

```
> css预处理器 -------Vite 也同时提供了对 .scss, .sass, .less, .styl 和 .stylus 文件的内置支持。没有必要为它们安装特定的 Vite 插件，但必须安装相应的预处理器依赖
* 安装 
```
# 如scss 
npm add -D sass

# less
npm add -D less

# stylus
npm add -D stylus
```
* 使用  
  1. 在*.vue中使用scss： `<style lang="scss"></style>`
  2. .scss文件使用

> 静态资源处理
```
# 图片导入
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl

// 显式加载资源为一个 URL
import assetAsURL from './asset.js?url'

// 以字符串形式加载资源
import assetAsString from './shader.glsl?raw'

// 加载为 Web Worker
import Worker from './worker.js?worker'

// 在构建时 Web Worker 内联为 base64 字符串
import InlineWorker from './worker.js?worker&inline'

# json导入
// 导入整个对象
import json from './example.json'
// 对一个根字段使用具名导入 —— 有效帮助 treeshaking！
import { field } from './example.json

# glob 导入
# Vite 支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块：
const modules = import.meta.glob('./dir/*.js')

# 转译为下面的样子
// vite 生成的代码
const modules = {
  './dir/foo.js': () => import('./dir/foo.js'),
  './dir/bar.js': () => import('./dir/bar.js')
}
```
> public目录
- 不会被源码引用
- 必须保持原有文件名
- 在开发时，直接通过/根路径访问；【public中的资源不被javascript文件引用】
> 自带： css 代码分割  
> CSS前缀【当前处理不正确，待解决】
```
# 安装
npm i autoprefixer  -D

# 配置vite.config.js
# 引入
import autoprefixer from 'autoprefixer';
# 使用
css:{
    postcss:{
      plugins:[autoprefixer],
    },
}
```
> 打包生成环境移除console和debugger
```
build:{
  // 生产环境移除console
  terserOptions:{
    compress:{
      drop_console:true,
      drop_debugger:true
    }
  }
}
```
> 路由vue-router
```
# 安装依赖
npm install vue-router@4

# 创建文件【router文件夹》index.ts文件,index.ts代码如下：】
import {createRouter,createWebHashHistory} from 'vue-router'
const CommonRoutes = [
  {path:'/',component:import("@/views/common/401.vue")},
]

function getRouter(){
  return createRouter({
    history:createWebHashHistory(),//采用hash模式
    routes:CommonRoutes
  })
}
const router = getRouter()
export default router
```
> pinia（代替vuex的使用）

```
# 安装依赖
npm install pinia

# 创建文件【pinia文件夹》index.ts文件,index.ts代码如下：】
import { defineStore } from "pinia";

export const  logicStore = defineStore('logic',{
  state:()=>{
    return {
      endPage:0,
    }
  },
  getters:{
    getEndPage():number{
      return this.endPage
    }

  },
  actions:{
    setEndPage(page:number){
      this.endPage = page;
    }
  }
})

# 在项目入口main.js文件中引入
import { createApp } from 'vue'
import { createPinia } from 'pinia'
const app = createApp(App);
app.use(createPinia()).mount('#app')

#在使用的.ts文件中使用，代码如下
import {logicStore} from '@/pinia/logic'
const logic = logicStore()
console.log(logic.getEndPage)
```
> 插件
- `@vitejs/plugin-legacy：为打包后的文件提供传统浏览器兼容性支持【就是不支持module引入的浏览器，通过nomodule方式】`
```
# 安装依赖
npm add -D @vitejs/plugin-legacy

# 使用
import legacy from '@vitejs/plugin-legacy';
#配置
plugins: [
  legacy({
    targets:['defaults','not IE 11']
  })
],
```
- `@vitejs/plugin-vue：支持vue`
```
# 安装依赖
npm add -S vue
npm add -D @vitejs/plugin-vue

# 使用配置
import vue from '@vitejs/plugin-vue';
plugins: [
  vue(),
],
```
- ``
- `@types/node：使用import {resolve} from 'path';时，报错提示找不到path模块，安装该模块`
```
# 安装依赖
npm add -D @types/node

# 使用
import {resolve} from "path";
# 配置别名
resolve:{
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
},

```
- `@vitejs/：为打包后的文件提供传统浏览器兼容性支持`
- `@vitejs/plugin-legacy：为打包后的文件提供传统浏览器兼容性支持`


> 构建优化
- `CSS代码分割`
- `预加载指令生成`
- `异步chunk优化`

> 打包
- 需要在嵌套的公共路径下【/myweb】部署项目,`由JS引入引入的资源URL,CSS中的url()以及.html文件中引用的资源在构建过程中都会自动调整`
```
# package.json文件里面调整配置

"scripts": {
    "build": "vue-tsc --noEmit && vite build --base=/myweb",
  },
```
> 外部引入
- vue
```
  #在html页面添加代码
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

  # 在vite.config.js的配置
  //自定义构建
    rollupOptions:{
      //确保外部化处理那些不想打包进库的依赖
      external:['vue'],
      output:{
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
          //(import xxx from aaa);此处的aaa就是vue;Vue来自于vue.js文件提供的Vue变量
        }
      }
    }
  # 提交了全局变量Vue【需要配合安装插件使用】
  npm i -D rollup-plugin-external-globals
  # vite.config.js中配置
  import externalGlobals from "rollup-plugin-external-globals";
  # 把上面的改成
  plugin:{

  },
  rollupOptions:{
      //确保外部化处理那些不想打包进库的依赖
      external:['vue'],
      plugins:[

      ],
      output:{
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
          //(import xxx from aaa);此处的aaa就是vue;Vue来自于vue.js文件提供的Vue变量
        }
      }
    }

```
> 3. vite的新特性
- 1. 模块热更新【无需重新加载页面】
- 2. 天然支持.ts文件【可以更加项目需要配置[tsconfig.json]文件】
- 3. 天然支持css【sass\less需要安装内容，上面有相关说明】
- 4. 支持CSS modules【任何通过`.module.css`为后缀的css文件都被认为是一个CSS modules 文件，使用方法说明如上】
- 5. 支持解析图片、字体、视频、js、json等媒体文件的引入【特殊文件类型需要安装依赖，如上说明】