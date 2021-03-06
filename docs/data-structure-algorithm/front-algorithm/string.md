---
title: 字符串类
id: string
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

## 单词驼峰转换为下划线
> - helloWorld => hello_world

```js
// 驼峰转换为下划线
const toLine = str => {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
  // return str.split(/([A-Z])/g).reduce((previousValue, currentValue, index) => {
  //   if (index < 1) {
  //     return previousValue + currentValue.toLowerCase();
  //   }
  //   if (index === str.split(/([A-Z])/g)) {
  //     return previousValue + '_' + currentValue.toLowerCase();
  //   }
  //   if (currentValue.length !== 1) {
  //     return previousValue + currentValue.toLowerCase();
  //   }
  //   else {
  //     return previousValue + "_" + currentValue.toLowerCase();
  //   }
  // }, '');
};
```

## 下划线转驼峰
```js
// 下划线转驼峰
const toHump = str => {
  return str.replace(/_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
  // return str.split('_').reduce(function (pre, cur, index) {
  //   if (index === 0) {
  //     return pre + cur
  //   }
  //   else {
  //     const last = cur.slice(0, 1);
  //     return `${pre}${last.toUpperCase()}${cur.slice(1)}`;
  //   }
  // }, '');
};
```

## 空格转驼峰
```js
// 空格转换为驼峰
const toHump = str => {
  return str.replace(/\s(\w)/, function (all, letter) {
    return letter.toUpperCase();
  })
};
```

## 驼峰转空格
```js
// 驼峰转换为空格
const toComm = str => {
  return str.replace(/([A-Z])/g, ' $1').toLowerCase();
};
```
