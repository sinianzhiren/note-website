---
title: koa
---

## koa常见的中间件
> 1. koa-router
> 2. koa-view (ejs, koa)
> 3. koa-bodyparser, body 数据解析
> 4. koa-static
> 5. koa-jwt
> 6. koa2-cors

## koa 与 express 区别
> - express自带路由，view等，像是一个web framework, koa像是一个对http的封装，自由度更高；
> - 从 `Handler 处理方式`、`中间件执行机制`、`响应机制` 多个维度看待区别：
>   - handler 处理方式      
>       - express使用的是回调的方式，一种线性的逻辑，在同一个线程上完成所有的http请求，由于express中使用callback，导致对错误处理不是很友好，没法对callback使用try...catch..
>       - koa1 是一个过渡版本，使用 generator函数 和 co 库；
>       - koa2 是采用的是 async 和 await ES7的异步终极解决方案；koa2 使用的是洋葱模型，通过 await next()的形式调用下游的中间件，直到下游没有可以执行的中间件并且堆栈执行完毕，最终才会又回到上游，这种方式对于日记记录很友好，比如：请求耗时统计，错误处理支持很完美；背靠promise，async 和 await只是一个语法糖；
>   - 中间执行机制
>       - Express 中间件实现是基于 Callback 回调函数同步的，它不会去等待异步（Promise）完成。
>       - 在 Koa 的中间件机制中使用 Async/Await（背后全是 Promise）以同步的方式来管理异步代码，它则可以等待异步操作。
>   - 响应方式
>       - koa的响应方式是`ctx.body = 'hello world'`, 并且设置后不会立即执行，而是会等待所有的中间件执行完毕后在执行，给了充足的时机对响应内容做处理；
>       - express 的响应方式是 `res.send()`，调用后立即响应，如果想在上层中间件中做点事情很困难；

**express**
```js
var express = require('express');
var app = express();

// 中间件
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

// 使用中间件
app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
```
**koa2**
```js
const Koa = require('koa');
const app = new Koa();

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
app.use(async ctx => {
  ctx.body = 'Hello World';
});
app.listen(3000);
```
