---
title: 数组
---

## 数组题目
> - 数组对于JavaScript很常见，可以使用数组表示，栈或者队列等数据结构；

### 电话号码的题目：通过老式电话获取任意的数字表示出字母组合（数字从2-9）
```javascript
/**
 * params num eg: 23
 * return ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"];
 */
const getCompose = (num) => {
  const strArr = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wzyx'];
  const result = [];
  let numArr = [];
  if (num.length > 1) {
    numArr = num.split('');
  }
  numArr.map(item => {
    if (item > 1) {
      result.push(strArr[item].split(''));
    }
  });

  const getData = (res) => {
    const temp = [];
    if (res.length > 0) {
      for (let i = 0; i < res[0].length; i++) {
        for (let j = 0; j < res[1].length; j++) {
          temp.push(`${res[0][i]}${res[1][j]}`);
        }
      }
      res.splice(0, 2, temp);
    }

    if (res.length > 1) {
      getData(result);
    }
    return res.flat();
  };

  return getData(result);
};
```
