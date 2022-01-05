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

// 空格转换为驼峰
const toHump = str => {
  return str.replace(/\s(\w)/, function (all, letter) {
    return letter.toUpperCase();
  })
};

// 驼峰转换为空格
const toComm = str => {
  return str.replace(/([A-Z])/g, ' $1').toLowerCase();
};

