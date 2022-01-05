// selfNew
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

const obj = selfNew(Parent, '10');
console.log(obj.num);

// apply
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

// call
Function.prototype.call = function (ctx, ...params) {
  const fn = this;
  ctx = ctx || window;
  ctx.fn = fn;
  const result = ctx.fn(...params);
  delete ctx.fn;
  return result;
};

// bind
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

// 节流函数
const throttle = function (fn, wait) {
  let lastTime = Date.now();

  return function (...args) {
    const now = Date.now();
    if (now - lastTime > wait) {
      lastTime = now;
      fn.apply(this, args);
    }
  }
};

setInterval(throttle(() => {
  console.log('hello world');
}, 500), 100);

// 防抖
const debounce = function (fn, wait) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  }
};

debounce(() => {
  console.log('hello world');
}, 2000)();

// 函数科里化
function curry(fn, curArgs) {
  return function () {
    let args = Array.from(arguments);
    if (curArgs !== undefined) {
      args = args.concat(curArgs);
    }

    if (args.length < fn.length) {
      return curry(fn, args);
    }
    return fn.apply(this, args);
  }
}
