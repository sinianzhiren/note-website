---
title: Vue基础
---

## class 与 style绑定
```vue
<div :class="{active: isActive}"></div>
data() {
  return {
    isActive: true
  }
}

<div :class="[activeClass, errorClass]"></div>
<div :class="[isActive ? activeClass : '', errorClass]"></div>
<div :class="[{ active: isActive }, errorClass]"></div>
```

### 和组件配合
```vue
<!-- 子组件模板 -->
<p class="foo bar">Hi!</p>
<!-- 在使用组件时 -->
<my-component class="baz boo"></my-component>
<!-- 渲染出的结果 -->
<p class="foo bar baz boo">Hi</p>
```
### style
```vue
<div :style="styleObject"></div>
data() {
    return {
        styleObject: {
            color: 'red',
            fontSize: '13px'
        }
    }
}
<!-- 绑定数组， baseStyles， overridingStyles 是对象 -->
<div :style="[baseStyles, overridingStyles]"></div>
```


## v-for 和 v-if
> - 不同同时作用在同一个HTML元素上

```vue
data() {
    return {
        parentMessage: 'Parent',
        items: [{ message: 'Foo' }, { message: 'Bar' }]
    }
}
<!-- 遍历的是数组 -->
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
<!-- 遍历的是对象  -->
<li v-for="(value, key, index) in myObject">
{{ index }}. {{ key }}: {{ value }}
</li>
```

## vue事件event
```vue
<button @click="add">加</button> 
<button @click="reduce(2, $event)">减</button>
```
> 1. 第一个方法中默认可以获取event；
> 2. 有其他参数的时候，通过$event传递参数；
> 3. event 是原生的event对象
> 4. 事件被挂载在当前的元素上

## 表单 v-model
> 修饰符，trim,lazy等，案件修饰符，ctrl

## 组件使用
> - props, $emit
```vue
<!--父组件-->
<div :list="list"></div>

<!--子组件-->
props: {
  list: {
    type: Array,
    default() {return []}
  }    
};
<!--或者-->
props: ['list']
```
```vue
this.$emit('add', 'test');
```
> - 组件间通讯，自定义事件
> - 组件生命周期

## v-for优先级是比v-if高
> - 永远不要把 v-if 和 v-for 同时用在同一个元素上，带来性能方面的浪费（每次渲染都会先循环再进行条件判断）
> - 可以使用template包裹


## vue3 和echarts5动态更新数据报错

> barPolar.js:63 Uncaught TypeError: Cannot read properties of undefined (reading 'type')


造成报错的原因是 vue3 中使用 proxy 的方式监听响应式，charts 实例会被在 vue 内部转换成响应式对象
在初始化的时候可以使用markRaw指定为非响应式即可

```js
<template>
  <div ref="lineChartDomRef"></div>
</template>

<script setup>
import { markRaw, ref, onMounted } from "vue";
import * as echarts from "echarts";

const lineChartInsRef = ref();
const lineChartDomRef = ref();

onMounted(() => {
  // 初始化时使用markRaw，后面使用lineChartInsRef.value实例更新时，就不会报错了
  const option = {
    // ...
  };
  lineChartInsRef.value = markRaw(echarts.init(lineChartDomRef.value));
  lineChartInsRef.value.setOption(option);

  window.addEventListener("resize", () => {
    lineChartInsRef.value.resize();
  });
});
</script>
```

## nginx 线上部署，刷新后页面 404

> 修改 nginx 配置
```shell
location / {
    root   /usr/share/nginx/dist; # 服务默认启动目录
    index  index.html index.htm; # 默认访问文件
+    try_files $uri /index.html; # 防止浏览器刷新后，页面404
    client_max_body_size 100m;
}
```

## watchEffect vs watch
> 1. watchEffect 会自动监听回调内部的依赖变量，依赖发生变化的时候都会执行
回调函数，watchEffect 执行后会返回一个函数，这个函数可以取消监听。如果监听的是一个ref dom
那么当dom未挂载之前会执行一次，当dom挂载上去也会执行一次，解决办法是：{flush: "post"}
> 2. 当检测到当前监听的对象是 reactive 的时候会自动设置 {deep: true} 
> 3. watch设置 immediate:true 就是当页面刚渲染时，就立即执行。此时oldValue为undefined。

```vue
const cancelWatch = watchEffect((onInvalidate) => {
  let timer = setTimeout(() => {
    console.log('hi')
  }, 2000);
  onInvalidate(() => { // 清除副作用
    clearTimeout(timer);
    console.log('执行回调函数');
  })
})

cancelWatch(); // 取消监听
```

## 自定义指令
```vue
// 父组件 App.vue
> - 内容首字母转换为大写显示

<script setup>
import vInput from './vInput.vue';
import { ref } from 'vue';
const value = ref('');
</script>

<template>
  <v-input v-model.capitalize="value" />
</template>

// 子组件  vInput.vue
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps(['modelValue', 'modelModifiers']);
const emit = defineEmits(['update:modelValue']);

function emitValue(e) {
  let value = e.target.value;
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1);
  }
  emit('update:modelValue', value);
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```
