---
title: 栈
---

> - 栈的主要应用和体现：（后进先出）
>   - 十进制转换为二进制（除于二取余数，由低到高排列）
>   - 判断字符串的括号是否有效闭合
>   - 函数的调用堆栈

example:
1. 判断括号是否有效闭合的算法(letcode: 20)
```javascript
const isValid = (str) => {
// 奇数直接不满足条件返回
  if (str.length % 2 !== 0) return false;
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(' || str[i] === '[' || str[i] === '{') {
      stack.push(str[i]);
    }
    else {
      if (
        (str[i] === ')' && stack[stack.length - 1] === '(') ||
        (str[i] === ']' && stack[stack.length - 1] === '[') ||
        (str[i] === '}' && stack[stack.length - 1] === '{')
      ) {
        stack.pop();
      }
      else {
        return false;
      }
    }
  }
  // 判断栈的长度是否为空
  return stack.length === 0;
};
console.log(isValid("()[]{}"));
```
