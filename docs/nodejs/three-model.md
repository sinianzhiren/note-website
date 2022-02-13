---
title: nodejs第三方常用的模块
---

## 文件系统类
### [glob](https://github.com/isaacs/node-glob)
> - 文件模式的匹配, 不会匹配 . 开头的文件
---
```javascript
const glob = require('glob');
glob('a/**/*.js', (error, matches) => {
  if (!error) {
    console.log(matches); // [ 'a/a.js', 'a/b/b.js' ]
  }
})

// 同步方法
try {
  const matches = glob.sync('a/**/&.js');
}catch (e) {
  console.error(e);
}
```

### [globby](https://github.com/sindresorhus/globby)
> - globby 是 glob 的增强版，提供promise的封装，支持多模式匹配，可以传入一个匹配数组
---
```javascript
const globby = require('globby');

(async () => {
  const files = await globby(['a/**/*.js', 'a/**/*.css'], {dot: true});
  console.log(files); // ['a/b/b.js', 'a/a.css']
})();
```

### [fs-extra](https://github.com/jprichardson/node-fs-extra)
> - fs的增强版，提供了promise的调用方式
---
```javascript
const fse = require('fs-extra');

(async () => {
  // 确认目录是否存在，如果不存在会创建目录
  await fse.ensureDir('./a');
  // 复制文件
  await fse.copy('./a/a.js', './a/aa.js');
  // 读 JSON 文件
  const aJSON = await fse.readJSON('./a/a.json');
  console.log(typeof aJSON, aJSON);
  // 写 JSON 文件
  await fse.writeJSON('./a/aa.json', { a: 1 }, { spaces: 2 });
  // 写 JSON 文件，如果目录不存在会创建
  await fse.outputJson('./c/aa.json', { a: 1 }, { spaces: 2 });
  // 删文件
  await fse.remove('./a/aa.json');
})();
```

## 执行命令
### [shelljs](https://github.com/shelljs/shelljs)
> - js来实现shell 命令的库
> - shell.exec 执行同步的任意shell命令，返回的code表示是否成功，除此之外还提供了which,echo等方法
---
```javascript
const shell = require('shelljs');

if (shell.exec('git init .').code === 0) {
  console.log('git 初始化成功');
}
```

### [cross-spawn](https://github.com/moxystudio/node-cross-spawn)
> - 与child_process一样，创建子进程，通过spawn 函数执行相应的命令
---
```javascript
const spawn = require('cross-spawn');

const child = spawn('npm', ['install'], {stdio: 'inherit'});
spawn.sync('npm', ['install'], {stdio: 'inherit'}); // 安装全部依赖
spawn.sync('npm', ['install', 'lodash', '--save'], {stdio: 'inherit'}); // 安装部分依赖
```

### [rimraf](https://github.com/isaacs/rimraf)
> - 相当于在命令行中执行，rm -rf
---
```javascript
const rimraf = require('rimraf');

rimraf('a/b.js', err => {
  if (!err) {
    console.log('删除成功');
  }
});

// package.json中
{
  "scripts": {
    "build": "rimraf build && npm run build"  
  }
}
```

## 网络请求
### [node-fetch](https://github.com/node-fetch/node-fetch)
### [axios](https://github.com/axios/axios)
### [undici](https://undici.nodejs.org/#/)
> - nodejs 中最快的请求库

## 小工具
### [open](https://github.com/sindresorhus/open)
> - 在代码中打开网页或者打开图片，比如: npm start启动的时候打开特定链接地址
---
```javascript
const open = require('open');

(async () => {
  await open('http://127.0.0.1:8080');
})();
```

### [http-server](https://github.com/http-party/http-server)
> - 启动一个服务

### [path-to-regexp](https://github.com/pillarjs/path-to-regexp)
> - 指定的path 转换为一个正则表达式工具，在接口里使用
---
```javascript
const { pathToRegexp } = require('path-to-regexp');

console.log(pathToRegexp('/openapi/:key')); // /^\/openapi(?:\/([^\/#\?]+?))[\/#\?]?$/i
```

### [url-join](https://github.com/jfromaniello/url-join)
> - 拼接任意参数为一个 url 
---
```javascript
const urlJoin = require('url-join');

console.log(urlJoin('http://www.google.com', 'a', '/b/cd', '?foo=123')); // http://www.google.com/a/b/cd?foo=123
```

## 相关
> - [js交互式终端](https://mp.weixin.qq.com/s/jemlh2b_lYWPqlXO7fUdSQ)
