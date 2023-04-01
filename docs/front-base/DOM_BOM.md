---
title: dom和bom的知识点
---

> dom: 文档对象模型，如何 document，element，等等dom对象
> bom: 浏览器对象模型, 主要是window对象

## 实现一个 removeAllEventListener 方法

```js
function removeAllEventListener(element) {
  const cloneElement = element.cloneNode(true);
  element.parentNode.replaceChild(cloneElement, element);
}
```
