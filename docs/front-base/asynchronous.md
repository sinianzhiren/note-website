---
title: 前端异步
---

## 回调函数
xxx

## promise
xxx

## generator
xxx

## async await
xxx

## 定时器函数
### setTimeout
xxx
### setInterval
xxx
### requestAnimationFrame
xxx
## 面试题解析
```javascript
async function async1() {
  console.log("async1 start");
  await  async2();
  console.log("async1 end");

}
async  function async2() {
  console.log( 'async2');
}
console.log("script start");
setTimeout(function () {
  console.log("settimeout");
},0);
async1();
new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});
console.log('script end');

```
**输出结果：**
> script start  
  async1 start  
  async2    
  promise1  
  script end    
  async1 end    
  promise2  
  settimeout    

## 参考链接
> 1. https://blog.csdn.net/baidu_33295233/article/details/79335127
