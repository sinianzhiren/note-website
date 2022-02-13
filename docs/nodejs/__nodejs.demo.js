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

