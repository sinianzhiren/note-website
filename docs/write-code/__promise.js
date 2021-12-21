const [PENDING, FULFILLED, REJECTED] = ['pending', 'fulfilled', 'rejected'];

const Promise = function (exctor) {
  const _this = this;
  this.status = PENDING;
  this.value = null;
  this.reason = null;
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
      _this.reason = reason;
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
  if (this.status === FULFILLED) {
    typeof onFulfilled === "function" && this.fulfilledFns.push(onFulfilled);
  }
  if (this.status === REJECTED) {
    typeof onRejected === "function" && this.rejectedFns.push(onRejected);
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
