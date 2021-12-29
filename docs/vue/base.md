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


