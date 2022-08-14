---
title: ES6的基础知识
---

## var, let, const知识
> 1. 函数的提升优于变量的提升，函数的提升是把函数挪到作用域的顶部，变量的提升只是把变量的声明提升到顶部；
> 2. var 可以在声明之前使用，let 和 const 因为暂时性死区，不能在声明之前使用；
> 3. var 声明的变量会挂载到window对象上，let和const不能；
> 4. let 和 const 基本一致，但是const声明的变量不能被赋值；

## JavaScript继承
### 原型继承

> - 组合继承   
> 通过在子类的构造函数中通过 `Parent.call(this, val)`继承父类的属性，子类的原型等于 `new Parent()`来继承父类的函数

```javascript
function Parent(val) {
  this.value = val;
}

Parent.prototype.getValue = function () {
  return this.value;
};

function Child(val) {
  Parent.call(this, val);
}

Child.prototype = new Parent();

const child = new Child(10);
console.log(child.getValue());
```
> 缺点：子类在继承父类的函数的时候会继承父类的一些不需要的属性，比如上面的value，存在内存上的浪费
---
> - 寄生组合继承  
> - 优化了上面组合继承的缺点，通过继承构造函数的原型实现继承

```javascript
function Parent(val) { 
  this.value = val;
}

Parent.prototype.getValue = function () {
  return this.value;
};

function Child(val) {
  Parent.call(this, val);
}

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
      value: Child,
      writable: true,
      configurable: true,
      enumerable: false
  }
});

const child = new Child(12);
console.log(child.getValue());
```
> 以上的继承将父类的原型赋值给子类的原型，并且设置了构造函数为子类，还能正确找到了子类的构造函数;


### class 继承

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Cat extends Animal {
  constructor(value) {
    super(value);
    this.name = value;
  }
}

const cat = new Cat('汤圆');
console.log(cat.getName());
```

## 模块化
> - 模块化好处 
> 1. 解决命名冲突的问题
> 2. 解决代码的复用性
> 3. 解决代码的维护性

### 模块化的历史
> 1. 立即执行函数
> 2. AMD和CMD
> 3. commonjs: 代表是 nodejs `exports = module.exports`, 不能对exports直接赋值，会使得两者不是指向同一个内存地址
> 4. ES module

### commonjs 和 es module的区别
> 1. commonjs支持动态的导入，如: `require(`${a}.js`)`, 而es module目前还不支持动态导入，目前已经有提案了
> 2. commonjs 是同步导入的，因为用于服务器，文件都在本地，即使主线程卡住影响也不大；es module是异步导入的，因为用于浏览器，需要下载文件
如果采用同步，卡住会影响页面的渲染
> 3. commonjs 导出采用的是值拷贝，就算是导出的值变了，导入的值也不会变，如果要更新需要重新导入一次；es module采用的是实时绑定的方式，导入和导出指向的是同一个地址
所以导入值会随导出的值变化；
> 4. es module 会编译为 `require/exports`执行；

### commonjs 和 es module循环引用问题
example:
```javascript
// foo.js
const bar = require('./bar');
console.log('this is from bar value = ', bar);
module.exports = 'this is foo';
```
```javascript
// bar.js
const foo = require('./foo');
console.log('this is from foo value = ', foo);
module.exports = 'this is bar';
```
```javascript
// index.js
const foo = require('./foo');
const bar = require('./bar');
console.log('end');
```

*结果如下：*
> this is from foo value =  {}  
  this is from bar value =  this is bar     
  end


**解释：**
> 1. 执行index.js发现导入foo.js, 去执行foo.js中的代码
> 2. foo中发现依赖bar文件，这时候不会执行foo.js转到bar.js中执行，
> 3. 在bar.js中发现又依赖foo.js，这就是循环依赖，这时候 bar.js的执行权不会继续交回去，而是直接取foo.js中的导出值 `module.exports`, 由于还没有执行到
foo.js中的导出部分，所以默认的导出是一个空对象，因此继续bar.js的执行顺序；
> 4. bar.js执行完后执行权交回给foo.js，继续执行；
> 5. 最后执行index.js剩下的部分；（或许你发现index中的bar.js为啥没有继续执行，因为这里node.js做了缓存了，缓存的时机是模块必须执行完之后）；

---

**es module的循环依赖较复杂：**
> - es module从加载入口到所有模块实例化执行主要经历三步：
>   - 构建
>   - 实例化
>   - 运行

1. 构建：  
从入口模块开始，根据import关键字遍历依赖树，每个模块生成一个模块记录，所有模块组成一个模块图谱；     
![模块依赖](/img/module-link.webp)

所有模块记录都会被缓存在模块映射中，即使是一个模块被多次依赖，也只会记录一次；从而避免模块的重复下载；     
![模块映射](/img/module-map.webp)

2. 实例化
> 根据模块记录的关系，在内存中把模块的导入 import 和导出 export 连接在一起，也称为活绑定。

JS引擎会为每个模块记录创建 `模块环境记录`（module environment record），用来关联模块实例和模块的导入/导出值。引擎会先采用 `深度优先后序遍历`（depth first post-order traversal），
将模块及其依赖的导出 export 连接到内存中（直到依赖树末端），然后逐层返回再把模块相对应的导入 import 连接到内存的同一位置。
![内存中建立依赖关系](/img/module-three-link.webp)
> 实例化只是JS引擎在内存中绑定模块间关系，并没有执行任何代码，
>也就是说这些连接好的内存空间中并没有存储变量值，
>然而，在此过程中导出函数将会被初始化，即所谓的 `函数具有提升作用`     
**JS引擎不需要关心是否存在循环依赖，只需要在代码运行的时候，从内存空间中读取该导出值。**     

3. 运行
> 往内存中填充真实的值

example1:
```javascript
// index.js
import './bar.js';
import './foo.js';
```
```javascript
// bar.js
console.log('bar starting');
export default {
  done: true,
}
import foo from './foo.js';
console.log('in bar, foo.done = %j', foo.done);
console.log('bar done');
```
```javascript
// foo.js
console.log('foo starting');
export default {
  done: true,
};
import bar from './bar.js';
console.log('in bar, foo.done = %j', bar.done);
console.log('foo done');
```

结果：
> foo starting
> 报错：bar undefined

example2:
```javascript
// index.js
import './bar.js';
import './foo.js';
```

```javascript
// bar.js
console.log('bar starting');
export default function () {
  return { done: true };
}
import foo from './foo.js';
console.log('in bar, foo.done = %j', foo().done);
console.log('bar done');
```
```javascript
// foo.js
console.log('foo starting');
export default function () {
  return {done: true}
}
import bar from './bar.js';
console.log('in bar, foo.done = %j', (bar()).done);
console.log('foo done');
```

结果：
> foo starting      
  in bar, foo.done = true       
  foo done      
  bar starting      
  in bar, foo.done = true       
  bar done

所以将示例1中的导出变为函数导出，那么就不会报错问题，因为函数的状态提升，在foo中引用的时候，函数已经声明了所以不会报错；

## Proxy
> proxy 是es6新增的一个api, 在Vue3中通过这个功能替换了以前的 `Object.defineProperty`来实现数据的响应式

```javascript
const p = new Proxy(target, handler);
```

```javascript
const onWatch = (obj, setBind, getLogger) => {
  const handler = {
    get(target, property, receiver) {
      getLogger(target, property);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value, property);
      return Reflect.set(target, property, value, receiver);
    }
  };
  return new Proxy(obj, handler);
};

const obj = {a: 1};
const p = onWatch(obj,
  (v, property) => {
    console.log(v, property);
  },
  (target, property) => {
    console.log(target);
    console.log(property);
  }
);
```

## map, filter, reduce
```javascript
[1, 2, 3].map(parseInt);
// 第一轮遍历：parseInt(1, 0) => 1
// 第二次遍历：parseInt(2, 1) => NaN
// 第三次遍历：parseInt(3, 2) => NaN
```

## 关于setTimeout 和 setInterval 中的this问题
```javascript
setTimeout(function() {
  console.log(this === window) // true
})
```
上述代码在任何时候调用this 都是 指的是 window

**解决办法**
> 1. 使用箭头函数；
> 2. 使用闭包解决；(_this = this)
> 3. 使用`bind`函数；

## 正则匹配汉字和数字
```js
/^[0-9\u4e00-\u9fa5]{2,20}$/
```

## 浏览器滚动条宽度的计算
> - [浏览器滚动条宽度的计算](https://blog.csdn.net/asd3331380/article/details/121901310)







