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

### 卡牌分组
> - [题目见力扣](https://leetcode-cn.com/problems/x-of-a-kind-in-a-deck-of-cards/)

> 给定一副牌，每张牌上都写着一个整数。
此时，你需要选定一个数字 X，使我们可以将整副牌按下述规则分成 1 组或更多组：

>每组都有 X 张牌。
组内所有的牌上都写着相同的整数。
仅当你可选的 X >= 2 时返回 true。
>
>eg: 输入：[1,2,3,4,4,3,2,1]  
     输出：true  
     解释：可行的分组是 [1,1]，[2,2]，[3,3]，[4,4]  
> eg: 输入：[1,1,2,2,2,2]  
      输出：true  
      解释：可行的分组是 [1,1]，[2,2]，[2,2]

```javascript
const hasGroupsSizeX = function(deck) {
  const arr = deck.sort((a, b) => a - b);

  if (arr.length < 2) return false;

  const obj = arr.reduce((pre, cur) => {
    if (!pre[cur]) {
      pre[cur] = 1;
    }
    else {
      pre[cur]++;
    }
    return pre;
  }, {});

  const array = Object.keys(obj).map((key) => obj[key]);
// 辗转相除法
  function gcd(a, b) {
    return a % b === 0 ? b : gcd(b, a % b);
  }
// 两两求最大公约数
  while (array.length > 1) {
    array.push(gcd(array.pop(), array.pop()))
  }
// 最后一个数即所求
  return array[0] > 1;
};
```
