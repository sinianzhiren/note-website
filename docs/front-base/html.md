---
title: HTML基础知识
---

## HTML语义化
> 1. 有利于SEO
> 2. 有利于维护代码
> 3. 用户体验更好，比如img的alt标签在图片展示不了的时候会显示alt的内容
> 4. 更好的访问性，有利于读屏软件的识别；
> 5. 有利于自动化测试；

### microFormats(微格式)
> 通过在HTML标签上添加一些有利于搜索引擎更加理解的名词，如：class上增加一些易于理解的信息，使得搜索引擎更好的爬取信息；

## 懒加载
> 1. getBoundingClientRect + clientHeight + dataSet API
> react 版本的懒加载：https://juejin.cn/post/6844903768966856717
```javascript
const images = document.querySelectorAll("img");
    const lazyLoad = () => {
    images.forEach((item) => {
      // 触发条件为img元素的CSSOM对象到视口顶部的距离 < 100px + 视口高度，+100px为了提前触发图片加载
      if (
        item.getBoundingClientRect().top <
        document.documentElement.clientHeight + 100
      ) {
        if ("src" in item.dataset) {
          item.src = item.dataset.src;
        }
      }
    });
    };
document.addEventListener("scroll", _.throttle(lazyLoad, 200));
```
