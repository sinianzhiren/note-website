// const process = require('process');

// console.log(process.cwd());
// console.log(__dirname);
// console.log(__filename);
// console.log(process.argv.slice(2));
// console.log(process.platform);

const fn = require('./test/t');
const path = require('path');

function f() {
  console.log(process.cwd());
  console.log(__dirname);
  console.log(__filename);

  console.log('parent');
}

// console.log(path.resolve('test', 't.js'))

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

const globby = require('globby');

(async () => {
  const files = await globby(['a/**/*.js', 'a/**/*.css'], {dot: true});
  console.log(files); // ['a/b/b.js', 'a/a.css']
})();

const shell = require('shelljs');

if (shell.exec('git init .').code === 0) {
  console.log('git 初始化成功');
}

const spawn = require('cross-spawn');

const child = spawn('npm', ['install'], {stdio: 'inherit'});
spawn.sync('npm', ['install'], {stdio: 'inherit'}); // 安装全部依赖
spawn.sync('npm', ['install', 'lodash', '--save'], {stdio: 'inherit'}); // 安装部分依赖

