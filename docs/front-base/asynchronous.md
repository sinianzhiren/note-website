---
title: 前端异步
---

## 回调函数
xxx

## promise
xxx

## generator
```javascript
function *foo(x) {
  const y = 2 * (yield (x + 1));
  const z = yield (y / 3);
  return x + y + z;
}

let it = foo(5);
console.log(it.next());
console.log(it.next(12));
console.log(it.next(13));
```
**输出结果**
> { value: 6, done: false }     
  { value: 8, done: false }     
  { value: 42, done: true } 

## async await
xxx

## 定时器函数
### setTimeout
xxx
### setInterval
xxx
### requestAnimationFrame
> 首先 requestAnimationFrame 自带函数节流功能，基本可以保证在 16.6 毫秒内只执行一次（不掉帧的情况下），并且该函数的延时效果是精确的，没有其他定时器时间不准的问题，当然你也可以通过该函数来实现 setTimeout。
  
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

## event Loop（浏览器事件循环）
> - 首先执行同步代码，这属于宏任务       
> - 当执行完所有同步代码后，执行栈为空，查询是否有异步代码需要执行       
> - 执行所有微任务       
> - 当执行完所有微任务后，如有必要会渲染页面      
> - 然后开始下一轮 Event Loop，执行宏任务中的异步代码，也就是 setTimeout 中的回调函数

**微任务**包括 process.nextTick ，promise ，MutationObserver。      
**宏任务**包括 script ， setTimeout ，setInterval ，setImmediate ，I/O ，UI rendering。

## nodejs Event Loop

