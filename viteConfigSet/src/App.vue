<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import classes from './assets/style/common.module.css'// 样式将会注入页面
// import classes from './assets/style/common.module.css?inline'// 样式不会注入页面，当前方式存在问题暂时不关
document.querySelector('body')!.className = classes.textRed;
</script>

<template>
  <div>
    <beauty-button type="primary" class="hover-double-line"></beauty-button><br/>
    
    <beauty-button class="hover-bg-white top-bottom"></beauty-button>
    <beauty-button class="hover-bg-white top-bottom top"></beauty-button>
    <beauty-button class="hover-bg-white top-bottom bottom"></beauty-button>
    <br/>
    <beauty-button class="hover-bg-white left-right"></beauty-button>
    <beauty-button class="hover-bg-white left-right left"></beauty-button>
    <beauty-button class="hover-bg-white left-right right"></beauty-button>

    <br/>

    
    <beauty-button plain></beauty-button>
    
    <image-shadow></image-shadow>
    
  </div>
</template>

<style lang="scss" scoped>
.beauty-button{
  margin:10px;
}
.logo {
  display:flex;
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  &:hover{
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  &.vue:hover{
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
.image-shadow{
  margin:10px auto;
  :deep(.image-shadow__box){
  -webkit-box-reflect:below 0 linear-gradient(transparent, transparent, rgba(0, 0, 0, 0.4));
  }
}
</style>
