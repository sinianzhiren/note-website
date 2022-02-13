---
title: nodejs并发请求代码  
author: Alex
---
## 用途
> - nodejs的并发请求主要用于爬虫（并发可以节省时间），减少前端页面的等待时间

## 代码实现
> 思路：使用promise 或者 async ... await 封装多个请求的方法，使用promise.all 同时发起并发请求
> - 下面的代码作者用于爬取 h265 的视频资源的部分代码
***
```javascript
// 将下载顺序封装在一个 async 方法内
const asyncFetchTs = (index) => {
  return async () => {
    try {
      return await superagent.get(getDownloadPath(index));
    }
    catch (e) {
      console.log('请求失败');
      console.log(e);
    }
  };
};
// 五个一组开始并发执行代码，并且按照顺序存储下载的ts数组
const fiveFetch = async (arrFn) => {
  while (arrFn.length > 0) {
    await Promise.all([...arrFn.splice(0, 5)].map(item => item()))
      .then(resArr => {
        if (resArr.length > 0) {
          resArr.forEach(({body, req}) => {
            const path = req.path;
            const lastIndex = path.lastIndexOf('/');
            const fileName = path.slice(lastIndex + 1);
            saveTsToSource('source', fileName, body); // 存储数据到文件中
          })
        }
      })
      .catch(err => {
        console.log('获取ts文件失败');
        console.log(err);
      })
  }
};
// 将所有需要下载的方法封装然后放入到一个数组中待下载
const start = async () => {
  let start = 0;
  let end = 300;
  let arrFn = [];
  while (start <= end) {
    arrFn.push(asyncFetchTs(start));
    start++;
  }
  console.log(arrFn.length);
  await fiveFetch(arrFn);
};
```
