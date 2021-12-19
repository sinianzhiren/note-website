---
title: 字符串类
---

## 反转字符串
> - eg: this is a 得到下面的结果
> - get: siht si a
```javascript
// 方式一
function reverseStr(rawStr) {
  return rawStr.split(' ').map(item => {
    return item.split('').reverse().join('');
  }).join(' ');
}
// 方式二 split 传入正则表达式
function reverseStr1(rawStr) {
  // 考察split 可以传入正则表达式
  return rawStr.split(/\s/g).map(item => {
    return item.split('').reverse().join('');
  }).join(' ');
}
// 方式三 match
function reverseStr2(rawStr) {
  // 正则 中括号 表示可选的意思，\w 表示单词
  return rawStr.match(/[\w']+/g).map(item => {
    return item.split('').reverse().join('');
  }).join(' ');
}
```
