const config = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
      chunks: ['index', 'vendor', 'common'] // 代码分割后需要引入
    })
  ],
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
};

const babelConfig = {
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

// 1 1 2 3 ....
function fib(index) {
  if (index === 0) {
    return 1;
  }
  if (index === 1) {
    return 1;
  }
  return fib(index - 1) + fib(index - 2);
}

// 尾递归
function fibEnd(index, all = 0) {
  if (index === 0) {
    return 1;
  }
  if (index === 1) {
    return 1;
  }

  return fibEnd(index - 1, (index - 1) + (index - 2));
}
