---
title: Vue 组件间的通讯方式
---

> vue3组件通信方式为以下几种
> - props
> - $emit
> - $expose / ref
> - $attrs
> - v-model
> - provide / inject
> - Vuex
> - mitt

## props
```vue
defineProps({
    // 写法一
    msg2:String
    // 写法二
    msg2:{
        type:String,
        default:''
    }
})
```

## $emit
```vue
// child.vue
<template>
  // 写法一
  <div @click="$emit('myclick')">按钮</div>
  // 写法二
  <div @click="handleClick">按钮</div>
</template>
// 方法一
const emitFn = defineEmits(['myClick']);
// 方法二
const handleClick = () => {
  emitFn('myClick','这是发送给父组件的信息');
}

// Parent.vue
<template>
  <child @myClick="onMyClick"></child>
</template>
<script setup>
import child from "./child.vue"
import onMychilk = (msg) => {
  console.log(msg) // 父组件收到的信息 
}
</script>
```

## $expose / ref
> 父组件获取子组件的实例的方法或者属性

```vue
// 子组件
import { defineExpose } from 'vue';
const initial = ref(10);
const count = ref(0);

defineExpose({
count,
initial
})

// 父组件
<HelloWorld ref="helloWorld" />
const helloWorld = ref(null);
onMounted(() => {
console.log('count: ' + helloWorld.value.count)
console.log('initial: ' + helloWorld.value.count)
})
```

## attrs
> attrs:包含父作用域除class和style除外的非props属性集合

```vue
// 父组件
 <HelloWorld title="test" />
// 子组件
import { useAttrs } from "vue";
const attr = useAttrs();
console.log(attr);
```

## v-model 
> 支持多个数据双向绑定

```vue
// 父组件
<HelloWorld v-model:key1="keyVal.key" v-model:value="keyVal.value" />
const keyVal = reactive({
key: 'name',
value: 'bobo'
})
// 子组件
import { defineEmits, defineProps } from "vue";
defineProps({
key1: String,
value: String,
});
const emits = defineEmits(['update:key1', 'update:value']);

const updateNewKeyVal = () => {
emits('update:key1', '新的key');
emits('update:value', '新的value');
}
<p>key: {{key1}}</p>
<p>value: {{value}}</p>
<div>
<button @click="updateNewKeyVal">更新信息</button>
</div>
```

## provide / inject
> provide/inject为依赖注入 provide：可以让我们指定想要提供给后代组件的数据 inject:在任何后代组件中接受想要添加在这个组件上的数据，不管组件嵌套多深都可以直接拿来用

```vue
// 父组件
<script setup>
  import { provide } from 'vue'
  const name = provide('name')
  console.log('name','沐华')
</script>
//子组件
<script setup>
  import { inject } from 'vue'
  const name = inject('name')
  console.log(name) //木华
</script>
```

## vuex or pinia
> 状态管理库

## mitt
> - Vue3中已经没有了EventBus跨组件通信，替代方案mitt.js，但原理方式EventBus是一样的
> - 安装方式 npm i mitt -S

```vue
// 封装
mitt.js
import mitt from 'mitt'
const mitt = mitt()
export default mitt
```

```vue
// 组件A 
<script setup>
  import mitt from './mitt'
  const handleClick = () => {
    mitt.emit('handleChange')
  }
</script>
// 组件B 
<script setup>
import mitt from './mitt'
import { onUnmounted } from 'vue'
const someMethod = () => {}
mitt.on('handleChange',someMethod)
onUnmounted(()=>{
  mitt.off('handleChange',someMethod)
})
</script>
```