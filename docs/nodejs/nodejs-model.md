---
title: nodejs原生的模块
---

## process 模块
> - 提供nodejs 进程相关的信息

### cwd
> - 返回当前node进程执行的目录

```javascript
process.cwd()
```


### argv
> - 获取执行node命令的时候传入的参数，返回的是一个数组
> - 数组的第一个项是 nodejs 的路径
> - 第二项是 当前执行文件的路径
> - 从第三项（index: 2）, 开始就是nodejs的参数
***
```javascript
process.argv;
process.argv.slice(2);
```

### env
> - process.env返回的是一个对象，存储了当前环境的变量，比如：NODE_ENV 区分当前的环境

### platform
> - 返回当前的运行环境，是 window，linux，还是 macos
***
```javascript
process.platform;
```

## cwd, __dirname, __filename 区别
> - cwd nodejs 初始执行的目录，不会受其他cwd位置的变化，一个项目中如果有多个 cwd(), 那么都指向
>同一个地址，不受cwd代码所在文件的目录的影响
> - __dirname 指向的是当前代码所有的文件夹的地址，与 __dirname 所在的文件的位置有关系
> - __filename 指向的是当前执行的代码的文件路径


## path 模块
### path.join
> - 将传入的多个目录拼接为一个目录
***
```javascript
const path = require('path');
path.join('aaa', 'bbb');
```

### path.resolve
> - path.resolve 将传入的多个路径和当前执行路径（process.cwd()），拼接在一起
> - path.resolve() = process.cwd() + path.join()

### path.basename
> - 返回指定path最后一个路径名，第二个参数是ext,可选，表示文件的扩展名
***
```javascript
console.log(path.basename(__filename)); // t.js
console.log(path.basename(__filename, '.js')) // t
console.log(path.basename(__filename, '.json')) // t.js
```

### path.dirname
> - 返回当前文件的文件夹路径
> - path.dirname == __dirname

### path.extname
> - 返回路径最后的扩展名
***
```javascript
console.log(path.extname(__filename)); // .js
```

## fs 模块
### fs.stat
> - 返回当前路径的信息
***
```javascript
fs.stat(__filename, ((err, stats) => {
  if (!err) {
    console.log("是否是文件: ", stats.isFile());
    console.log("是否是文件夹: ", stats.isDirectory());
    console.log('大小: ', stats.size);
    console.log("访问时间: ", stats.atime);
    console.log('上次文件内容修改的时间: ', stats.mtime);
    console.log('上次文件状态改变的时间: ', stats.ctime);
    console.log('文件创建的时间: ', stats.birthtime);
  }
}));
```

### fs.readdir 
> - 获取 path 目录下的文件或者文件夹，返回值为一个包含 file 和 directory 的数组
***
```javascript
fs.readdir(__dirname, (err, files) => {
  if (!err) {
    console.log(files); // 数组
  }
});
```

### fs.readFile
> - 小文件的读取，会先读取于内存中


### fs.writeFile
> - 写文件，应用于小文件的时候，写入


### fs.appendFile
> - 文件内容的追加
***
```javascript
fs.appendFile(path.join(__dirname, 'new.js'), ' 13', "utf-8", err => {
  if (!err) {
    console.log('添加成功');
  }
});
```

### fs.createReadStream
> - 流的方式读取文件信息，应用于大文件的时候
***
```javascript
const file = fs.createReadStream(__filename, {encoding: "utf-8"});
let buf = '';
file.addListener('data', chunk => {
  buf += chunk;
});
file.addListener('end', () => {
  console.log(buf.toString('utf-8'));
});
```

### fs.createWriteStream
> - options
>   - encoding: 默认 utf8
>   - flag 文件的写入方式，默认 w, r+: 修改方式（追加）需要配置start一起使用，a: 追加方式
>   - start: 开始写入的位置（字节数）
***
```javascript
const writeFile = fs.createWriteStream(path.join(__dirname, 'new8.js'), {encoding: "utf-8", flags: 'a'});
writeFile.write(' fack');
writeFile.end(() => {
  console.log('写入完毕');
});
writeFile.addListener('close', () => {
  console.log('文件已经被关闭了');
});
writeFile.addListener('error', err => {
  console.log('错误', JSON.stringify(err))
});
```

***
> 1. fs.stat  检测是文件还是目录(目录 文件是否存在) 
> 2. fs.mkdir  创建目录 （创建之前先判断是否存在） 
> 3. fs.writeFile  写入文件(文件不存在就创建,但不能创建目录) 
> 4. fs.appendFile 写入追加文件 
> 5.fs.readFile 读取文件 
> 6.fs.readdir 读取目录 
> 7.fs.rename 重命名 
> 8. fs.rmdir  删除目录 
> 9. fs.unlink 删除文件


## util 模块
### util.promisify
> - 传入一个函数，将非promise化的函数转换为promise化
***
```javascript
const util = require('util');
const asyncReadFile = util.promisify(fs.readFile); // 异步读取文件
```

## querystring 模块
> - querystring.parse
> - querystring.stringify
> - querystring.encode
> - querystring.decode
