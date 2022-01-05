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

Promise.all = function (arrayPromise) {
  if (!Array.isArray(arrayPromise)) {
    return new Error('参数必须是一个数组');
  }

  return new Promise(function (resolve, reject) {
    try {
      const arrRes = [];
      for (let i = 0; i < arrayPromise.length; i++) {
        arrayPromise[i].then(res => {
          arrRes.push(res);
          if (arrRes.length === arrayPromise.length) {
            return resolve(arrRes);
          }
        }, reject);
      }
    }
    catch (e) {
      return reject(e);
    }
  })
};

Promise.race = function (arrayPromise) {
  if (!Array.isArray(arrayPromise)) {
    return new Error('参数必须是一个数组');
  }

  return new Promise(function (resolve, reject) {
    try {
      for (let i = 0; i < arrayPromise.length; i++) {
        arrayPromise[i].then(resolve, reject);
      }
    }
    catch (e) {
      return reject(e);
    }
  })
};

