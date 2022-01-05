---
title: 递归
---

## 斐波那契数列
> - 0，1，1，2，3，5，8，13，21，34，55，89....
> - 斐波那契数列就是从 0 和 1 开始，后面的数都是前两个数之和

### 普通递归计算
> - 存在的问题是：爆栈问题，前面的函数一直没有得到释放，存在栈中
```js
const fib = n => {
  if (n < 2 && n >= 0) return n;
  return fib(n - 1) + fib(n - 2);
};
```

### 优化：尾递归
```js
const fib1 = (n, sum1 = 1, sum2 = 1) => {
  if (n < 2 && n >= 0) {
    return n === 0 ? 0 : sum2;
  }
  return fib1(n - 1, sum2, sum1 + sum2);
};
```

### 动态规划
> - 自底向上分解子问题
> - 通过变量存储已经计算过的解

```js
function fib2(n) {
  const arr = [0, 1];
  if (n < 2 && n >= 0) return arr[n];

  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
}
```
