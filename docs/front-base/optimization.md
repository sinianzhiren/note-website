---
title: 性能优化
---

## 图片优化
> - 计算合适的图片大小
> - 图片加载优化
>   - 简单的效果不用图片，使用css代替
>   - 移动端加载合适尺寸的图片，使用cdn 做缓存；
>   - 小图片使用base64
>   - 多图标合并成为一张雪碧图
>   - 选择正确的图片格式，比如：不考虑兼容性使用webp, 小图片使用svg, 照片使用jpeg

## DNS 预解析

## 节流
> 例如页面滚动加载的场景，当滚动的时候，可以隔一段时间在发起一次请求，这种情况使用节流；
```javascript
// 节流
const throttle = (fn, wait = 100) => {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime > wait) {
      lastTime = now;
      fn.apply(this, args)
    }
  }
};

setInterval(throttle(() => {
  console.log(1);
}, 500), 1);
```

## 防抖
> 例如有个按钮，点击后发起请求，如果用户连续点击，那么就会出现一直请求，所以需要做防抖，只有当用户点击后一段时候后才可以请求；
>
```javascript
// 防抖
const debounce = (fn, wait = 100) => {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
};
```

## 预加载
> 在开发中，可能会遇到这样的情况。有些资源不需要马上用到，但是希望尽早获取，这时候就可以使用预加载。
```javascript
<link rel="preload" href="" />
```
## 预渲染
> 可以通过预渲染将下载的文件预先在后台渲染，可以使用以下代码开启预渲染
```javascript
<link rel="prerender" href="http://example.com"> 
```
## 图片懒加载
> 懒加载就是将不关键的资源延后加载。

## CDN
> 多机房缓存数据；
