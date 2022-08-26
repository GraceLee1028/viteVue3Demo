<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { isReactive, isReadonly, reactive, shallowReactive, shallowReadonly,ref, onMounted } from 'vue';
import classes from './assets/style/common.module.css'// 样式将会注入页面
// import classes from './assets/style/common.module.css?inline'// 样式不会注入页面，当前方式存在问题暂时不关
document.querySelector('body')!.className = classes.textRed;

// const state = shallowReadonly({
//   name:'lee',
//   data:[1,2,3],
//   nested:{
//     name:'123',
//     age:12
//   }
// })
// console.log(isReadonly(state));
// console.log(isReadonly(state.name));
// console.log(isReadonly(state.data));
// console.log(isReadonly(state.nested));
// state.data.push(12)//正常执行，页面正常显示
//   state.nested.name='1234'//正常执行，页面正常显示
// const doIt  = ()=>{
//   // state.name=1 //报错，提示该属性只读
//   // state.data = [12]//报错，提示该属性只读
//   // state.nested = {name:'1234',age:124}////报错，提示该属性只读
//   state.data.push(123)//正常执行，但是页面不响应显示
//   state.nested.name='12345'//正常执行，但是页面不响应显示
// }

// const obj:any = {foo:'123',bar:'test'}
// const objProxy = reactive(obj)
// console.log(objProxy===obj)// 打印:false

// const doIt = ()=>{
//   obj.foo = 'foo 123'//页面上没有响应显示：{{objProxy.foo}}
//   obj.name = 'lee';//页面上没有响应显示：{{objProxy.foo}}
//   console.log(obj)//打印，{foo: '123', bar: 'test', name: 'lee'}
//   console.log(objProxy)//打印，Proxy {foo: '123', bar: 'test', name: 'lee'}
//   console.log(objProxy.name,objProxy.foo)//打印：lee foo 123
//   objProxy.foo ='from proxy set data foo'//页面上响应显示: {{objProxy.foo}}
//   objProxy.name ='from proxy set data name'//页面上响应显示: {{objProxy.name}}
//   console.log(obj)//打印，{foo: 'from proxy set data foo', bar: 'test', name: 'from proxy set data name'}
//   console.log(objProxy)//打印，Proxy {foo: 'from proxy set data foo', bar: 'test', name: 'from proxy set data name'}
//   console.log(objProxy.name,objProxy.foo)//打印：from proxy set data name from proxy set data foo
//   let foo = obj.foo;
//   foo = 'new foo'
//   console.log(foo)// 打印: new foo
//   console.log(obj.foo)//打印：123
//   let fooFromProxy = objProxy.foo;
//   fooFromProxy = 'new foo'
//   console.log(fooFromProxy)// 打印: new foo
//   console.log(objProxy.foo)//打印：123
// }

// function doIt(event:Event){
//   const target = event.target as HTMLButtonElement;
//   console.log(target.innerText) //打印3D BUTTON
// }

const selected = ref('A')
const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])

const inputValue = ref();
const doIt = (event:Event)=>{
  const target = (event.target as HTMLSelectElement)
  console.log(target.selectedOptions)
  let selectedOptions = target.selectedOptions
  inputValue.value = target.multiple?(selectedOptions as any).map((item:HTMLOptionElement)=>item.value||item.text):(selectedOptions[0].value||selectedOptions[0].text);
}
onMounted(()=>{
  console.log('============onMounted')
})
</script>

<template>
  <div>
    {{inputValue}}----
    <!-- <input id="checkOne" type="checkbox" @change="doIt" /> -->
    <!-- <input id="checkOne" type="checkbox" v-model="inputValue" /> -->
    <!-- <label for="checkOne">选项1</label> -->
    <select @change="doIt">
      <option v-for="option in options" :value="option.value">
          {{ option.text }}
      </option>
  </select>
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
    <router-view></router-view>
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
