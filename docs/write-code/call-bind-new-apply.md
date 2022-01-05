---
title: bind,new,call,apply
---

## bind
> 注意：这里bind返回的函数可以通过两种方式执行，1. 直接调用，2. 通过new 操作符；需要加以判断
```javascript
Function.prototype.bind = function (ctx, ...params) {
  const fn = this;
  ctx = ctx || window;

  return function F(...args) {
    if (this instanceof F) {
      return new fn(...params, ...args);
    } 
    return fn.apply(ctx, params.concat(args));
  }
};
```

## call
```javascript
Function.prototype.call = function (ctx, ...params) {
  const fn = this;
  ctx = ctx || window;
  ctx.fn = fn;
  const result = ctx.fn(...params);
  delete ctx.fn;
  return result;
};
```

## apply

```javascript
Function.prototype.apply = function (ctx, params) {
  if (!Array.isArray(params)) {
    return new Error('传入第二个参数必须是个数组');
  }
  const fn = this;
  ctx = ctx || window;
  ctx.fn = fn;
  const result = ctx.fn(...params);
  delete ctx.fn;
  return result;
};
```

## new
> 1. 首先创建一个对象，这个对象作为执行构造函数返回的实例；
> 2. 将对象的原型(__proto__)指向构造函数的原型(prototype)
> 3. 将这个空对象作为构造函数中的this(使用apply, call, bind)，执行构造函数
> 4. 根据构造函数的结果，返回构造函数的结果或者首先创建的对象(三目运算符)

```javascript
const selfNew = function (ConstructFn, ...params) {
  const obj = Object.create(ConstructFn.prototype);
  // apply第二个参数是数组，但是在ConstructFn函数内部会自动解开这个函数的参数，data会自动变为第一项
  const result = ConstructFn.apply(obj, params);
  return result instanceof Object ? result : obj;
};

// use example
function Parent(data) {
  console.log(data);
  this.num = data;
  return this;
}

const obj = selfNew(Parent, '10', '12');
console.log(obj.num);
```
