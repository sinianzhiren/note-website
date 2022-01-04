---
title: vue源码解读
---

*基于vue 2.x来解读*

## 静态类型检查
> vue2 基于flow的静态类型检查

## 源码结构
> src   
  ├── compiler        # 编译相关    
  ├── core            # 核心代码    
  ├── platforms       # 不同平台的支持     
  ├── server          # 服务端渲染   
  ├── sfc             # .vue 文件解析   
  ├── shared          # 共享代码    

## 源码构建
> - runtime only
>   - 只包含运行时的Vue的代码，开发下需要借助webpack vue-loader将.vue文件编译为可识别的代码；

```vue
// 这种情况不需要
new Vue({
  render (h) {
    return h('div', this.hi)
  }
})
```

> - runtime + compiler
>   - 需要编译器，将template编译为render函数

```vue
// 需要编译器的版本
new Vue({
  template: '<div>{{ hi }}</div>'
})
```

## 手写render函数
```vue
new Vue({
  el: '#app',
  render(createElement) {
    return createElement('div', {
      attrs: {
        id: 'app',
      }
    }, this.message);

  },
  data() {
    return {
      message: 'hello world'
    }
  }
});
```
