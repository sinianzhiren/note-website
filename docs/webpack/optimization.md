---
title: webpack性能优化
---

## 减少webpack打包的时间
### 优化loader
> - 优化loader文件的搜素范围（include，exclude）
> - 将babel编译过后的文件缓存起来。`loader: 'babel-loader?cacheDirectory=true`

### happyPack开启多线程编译打包

### Dllplugin
> - DllPlugin 可以将特定的类库提前打包然后引入。这种方式可以极大的减少打包类库的次数，只有当类库更新版本才有需要重新打包，并且也实现了将公共代码抽离成单独文件的优化方案。
```javascript
// 单独配置在一个文件中
// webpack.dll.conf.js
const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    // 想统一打包的类库
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].dll.js',
    library: '[name]-[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      // name 必须和 output.library 一致
      name: '[name]-[hash]',
      // 该属性需要与 DllReferencePlugin 中一致
      context: __dirname,
      path: path.join(__dirname, 'dist', '[name]-manifest.json')
    })
  ]
}
```
```javascript
// webpack.conf.js
module.exports = {
  // ...省略其他配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest 就是之前打包出来的 json 文件
      manifest: require('./dist/vendor-manifest.json'),
    })
  ]
}
```

### 其他优化建议
> - resolve.extensions, 表示文件后缀列表，将高频出现的文件后缀名放在前面；
> - resolve.alias, 通过别名的方式映射路径，让webpack更快的找到路径；
> - module.noParse: 确定一个文件下没有其他依赖，可以让webpack不扫描该文件；

## 减少webpack打包的体积
> - 按需加载：将每个路由页面单独打包成一个文件，减少首屏页面下载文件的大小；
> - Scope Hoisting
>   - Scope Hoisting 会分析出模块之间的依赖关系，尽可能的把打包出来的模块合并到一个函数中去。
>   - 在 Webpack4 中你希望开启这个功能，只需要启用 optimization.concatenateModules 就可以了。
```javascript
module.exports = {
  optimization: {
    concatenateModules: true
  }
}
```
> - Tree Shaking
>   - Tree Shaking 可以实现删除项目中未被引用的代码
>   - 使用 Webpack 4 的话，开启生产环境就会自动启动这个优化功能
