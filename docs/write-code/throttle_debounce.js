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





