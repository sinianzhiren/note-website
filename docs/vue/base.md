---
title: Vue基础
---

## v-if 和 v-show


## v-for 和 v-if
> - 不同同时作用在同一个HTML元素上

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
