---
title: promise
---

> - 注意：resolve和reject函数中的this需要在外面声明this，因为比如示例中的resolve或者reject在setTimeout 中调用，那么内部的this指向的是window

```javascript
const [PENDING, FULFILLED, REJECTED] = ['pending', 'fulfilled', 'rejected'];

const Promise = function (exctor) {
  const _this = this;
  this.status = PENDING;
  this.value = null;
  this.fulfilledFns = [];
  this.rejectedFns = [];

  function resolve(value) {
    if (_this.status === PENDING) {
      _this.status = FULFILLED;
      _this.value = value;
      _this.fulfilledFns.map(fn => fn(value));
    }

  }
  function reject(reason) {
    if (_this.status === PENDING) {
      _this.status = REJECTED;
      _this.value = reason;
      _this.rejectedFns.map(fn => fn(reason));
    }
  }

  try {
    typeof exctor === "function" && exctor(resolve, reject);
  }
  catch (e) {
    reject(e);
  }
};

Promise.prototype.then = function (onFulfilled, onRejected) {
  if (this.status === PENDING) {
    typeof onFulfilled === "function" && this.fulfilledFns.push(onFulfilled);
    typeof onRejected === "function" && this.rejectedFns.push(onRejected);
  }
  if (this.status === FULFILLED) {
    typeof onFulfilled === "function" && onFulfilled(this.value);
  }
  if (this.status === REJECTED) {
    typeof onRejected === "function" && onRejected(this.value);
  }
};

// use example
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 100);
  // reject(2);
}).then(res => {
  console.log(res)
}, err => {
  console.log(err);
});
```
