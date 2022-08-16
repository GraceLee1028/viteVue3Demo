<script lang="ts">
  import { defineComponent } from 'vue'  
  export default defineComponent({
    name:'BeautyButton',
    props:{
      type:{
        type:String,
        default:''
      },
      plain:{
        type:Boolean,
        default:false
      }
    },
    computed:{
      getColor(){
        const colorObj = {
          'primary':'#6666FF',
          'success':'#009966',
          'danger':'#FF6666'
        };
        const color:string= colorObj[<string>this.type||'primary'];
        return color;
      }
    }
  })
</script>
<template>
  <button :style="`--primary-color:${getColor}`" :class="[`beauty-button__${type}`,{'beauty-button--plain':plain}]" class="beauty-button"><slot>3d button</slot></button>
</template>
<style lang="scss" scoped>
  .beauty-button{
    border: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background: none;
    cursor: pointer;
    padding: 25px 80px;
    display: inline-block;
    box-sizing: border-box;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    outline: none;
    position: relative;
    transition: all 0.3s;
    z-index:1;
    span{
      z-index: 10;
    }
    &.block{
      display:block;
    }
    &__primary{
      background-color: var(--primary-color);
      border:3px solid var(--primary-color);
      color:#fff;
      border-color:transparent;
    }
    &--plain{
        border:3px solid var(--primary-color);
        color:#fff;
    }
    &--plain.beauty-button__primary,&--plain.beauty-button__success,&--plain.beauty-button__danger{
      border-color:var(--primary-color);
      background-color: #fff;
      color:var(--primary-color);
    }
    &.hover-double-line:hover{
      border:4px double var(--primary-color);
      background-color: transparent;
      color:var(--primary-color);
    }
    &.hover-bg-white{
      overflow: hidden;
      color:#fff;
      border:3px solid #fff;
      &::after{
        content:'';
        position: absolute;
        z-index:-1;
        display: inline-block;
        transition:all 0.3s;
        background-color: #fff;
      }
      &.top-bottom,&.left-right{
        &::after{
          top:50%;
          left:50%;
          opacity: 0;
          transform: translateX(-50%) translateY(-50%);
        }
      }
      &.top-bottom{
        &::after{
          width:102%;
          height:0;
        }
      }
      &.left-right{
        &::after{
          width:0;
          height:100%;
        }
      }
      &.left{
        &::after{
          left:0%;
          top:0;
          transform: translateX(0);
        }
      }
      &.right{
        &::after{
          left:auto;
          right:0;
          top:0;
          transform: translateX(0);
        }
      }
      &.top{
        &::after{
          top:0;
          left:0;
          transform: translateY(0);
        }
      }
      &.bottom{
        &::after{
          top:auto;
          bottom: 0;
          left:0;
          transform: translateY(0);
        }
      }
      &:hover{
        color:var(--primary-color);
        &.top-bottom::after{
          opacity: 1;
          height:80%;
        }
        &.top::after,&.bottom::after{
          height:100%;
        }
        &.left-right::after{
          opacity: 1;
          width:97%;
        }
        &.left::after,&.right::after{
          width:100%;
        }
      }
    }
  }
</style>