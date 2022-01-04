---
title: webpack高级配置
---

## 多入口
> - 多entry，多个pluginHTML模板，输出的output区分名称`[name]`

## css 文件分离压缩
> - 使用插件和修改 loader的方式
> - `mini-css-extract-plugin` loader 和 分离css文件
> - 压缩css文件
```js
// terser-webpack-plugin css-minimizer-webpack-plugin
optimization: {
  minimizer: [new TerserJsPlugin({}), new MiniCssExtractPlugin({})]
}
```

## 分离第三方模块，抽离公共代码模块
```js
plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
      chunks: ['index', 'vendor', 'common'] // 代码分割后需要引入
    })
  ]

optimization: {
    splitChuncks: {
      chunks: 'all', // initial, async, all
      // 缓存分组
      cacheGroups: {
      // 第三方模块
        vendor: {
          name: 'vendor',
          priority: 1, // 权重
          test: /node_modules/,
          minSize: 0, // 大小限制
          minChunks: 1, // 最少重复次数
        },
        // 公共模块
        common: {
          name: 'common',
          priority: 0,
          minSize: 0,
          minChunks: 2, // 公共模块最少重复用过2次
        }
      }
    }
  }
```
