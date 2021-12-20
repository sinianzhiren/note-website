/**
 * params num eg: 23
 * return [];
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

// console.log(getCompose("347"));

// 数组分组
// eg: [1, 1, 2, 2, 2, 2]
// res: true ([[1, 1], [2, 2], [2, 2]])
const hasGroupsSizeX = function(deck) {
  var arr = deck.sort((a, b) => a - b);
  let min = Number.MAX_SAFE_INTEGER;
  let result = true;

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

  console.log(obj);

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

console.log(hasGroupsSizeX([1,3,4,4,3,2,1]));
