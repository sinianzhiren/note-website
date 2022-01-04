---
title: babel的配置
---

## babel-runtime 和 babel-polyfill
```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": 3,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
};
```
> - babel-runtime 解决 babel-polyfill 编译后出来的污染全局环境的问题，使用babel-runtime解决；
> - babel-polyfill 包括 corejs和regenerator 库（babel 7 后就废弃使用polyfill 推荐直接使用core.js和regenerator）
