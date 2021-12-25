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
console.log(it.next());
console.log(it.next(12));
console.log(it.next(13));

// { value: 6, done: false }
// { value: 8, done: false }
// { value: 42, done: true }
