<script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name:'ImageShadow',
    props:{
      width:{
        type:[String,Number],
        default:240
      },
      height:{
        type:[String,Number],
        default:300
      }
    },
    computed:{
      getWidth(){
        return typeof this.width==='number'?`${this.width}px`:this.width;
      },
      getHeight(){
        return typeof this.height==='number'?`${this.height}px`:this.height;
      }
    }
  })
</script>
<template>
  <section class="image-shadow" :style="{width:getWidth,height:getHeight}">
    <div class="image-shadow__box image-shadow__box--front">
      <img src="./assets/images/one.jpg" />
    </div>
    <div class="image-shadow__box image-shadow__box--back">
      <img src="./assets/images/two.jpg" />
    </div>
  </section>
</template>
<style lang="scss" scoped>
  .image-shadow{
    position:relative;
    transition: transform 1s ease-in-out;
    transform-style: preserve-3d;
    &:hover{
      transform: rotateY(0.5turn);
    }
    &__box{
      position:absolute;
      left:0;
      right:0;
      top:0;
      bottom: 0;
      width:100%;
      height:100%;
      backface-visibility: hidden;
      transition: transform 1s ease-in-out;
      img{
        width:100%;
        height:100%;
        object-fit: cover;
      }
      &--back{
        transform: rotateY(0.5turn);
      }
    }
  }
</style>