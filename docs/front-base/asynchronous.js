// async function async1() {
//   console.log("async1 start");
//   await  async2();
//   console.log("async1 end");
//
// }
// async  function async2() {
//   console.log( 'async2');
// }
// console.log("script start");
// setTimeout(function () {
//   console.log("settimeout");
// },0);
// async1();
// new Promise(function (resolve) {
//   console.log("promise1");
//   resolve();
// }).then(function () {
//   console.log("promise2");
// });
// console.log('script end');

function *foo(x) {
  const y = 2 * (yield (x + 1));
  const z = yield (y / 3);
  return x + y + z;
}

let it = foo(5);
// console.log(it.next());
// console.log(it.next(12));
// console.log(it.next(13));

// { value: 6, done: false }
// { value: 8, done: false }
// { value: 42, done: true }

console.log('script start');
async function async1() {
  await async2();
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1();
setTimeout(function() {
  console.log('setTimeout')
}, 0);
new Promise(resolve => {
  console.log('Promise');
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  });
console.log('script end');

// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout


// script start
// async2 end
// Promise
// script end
// async1 end
// promise1
// promise2
// setTimeout

document.body.addEventListener('click', function (e) {
  console.log(e);
}, {
  capture: false,
  once: true,
  passive: true
});
