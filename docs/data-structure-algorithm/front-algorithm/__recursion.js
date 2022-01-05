const fib = n => {
  if (n < 2 && n >= 0) return n;
  return fib(n - 1) + fib(n - 2);
};

const fib1 = (n, sum1 = 1, sum2 = 1) => {
  if (n < 2 && n >= 0) {
    return n === 0 ? 0 : sum2;
  }
  return fib1(n - 1, sum2, sum1 + sum2);
};

// 动态规划的题
function fib2(n) {
  const arr = [0, 1];
  if (n < 2 && n >= 0) return arr[n];

  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
}

fib2(5);
