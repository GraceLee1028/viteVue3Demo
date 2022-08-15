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
> 自带： css 代码分割  
> CSS前缀
```
# 安装
npm i autoprefixer postcss -D

# 配置vite.config.js

# postcss.config.js

```
>打包生成环境移除console和debugger
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
plugins: [
  vue(),
],
```
- `@types/node：使用import {resolve} from 'path';时，报错提示找不到path模块，安装该模块`
```
# 安装依赖
npm add -D @types/node

# 使用
import {resolve} from "path";
# 配置
resolve:{
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
},

```
- `@vitejs/：为打包后的文件提供传统浏览器兼容性支持`
- `@vitejs/plugin-legacy：为打包后的文件提供传统浏览器兼容性支持`


