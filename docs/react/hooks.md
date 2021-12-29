---
title: react hooks
---

## useMemo 和 useCallback 区别
**上例子：**
```js
import React, {useState, useMemo, useCallback, useRef, createRef } from 'react';

const Parent = () => {
  const [num, setNum] = useState(0);
  const add = () => {
    console.log('child click');
  };

  return (
    <div>
      <span>{num}</span>
      <button onClick={() => setNum((pre) => pre + 1)}>add</button>
      <Child add={add} />
    </div>
  )
};

const Child = React.memo(({add}) => {
  return <button onClick={add}>child add</button>
});
```
> - 上面的代码虽然使用了 `memo` 优化，但是点击父组件的 add 还是会使得子组件重复渲染；
> - 需要使用 `useMemo或者useCallback`优化
> - useCallback 其实是 useMemo 的语法糖 `useCallback(fn, deps) 相当于 useMemo(() => fn, deps)`
> - useMemo 优化针对当前的组件处理计算量比较大的开销；
> - useCallback 优化针对子组件的渲染；

```js
import React, {useState, useMemo, useCallback, useRef, createRef } from 'react';

const Parent = () => {
  const [num, setNum] = useState(0);
  const _add = () => {
    console.log('child click');
  };

  const add = useCallback(() => {
    _add();
  }, []);
  // or
  const add = useMemo(() => {
    return () => {
      console.log('child click');
    };
  }, []);

  return (
    <div>
      <span>{num}</span>
      <button onClick={() => setNum((pre) => pre + 1)}>add</button>
      <Child add={add} />
    </div>
  )
};

const Child = React.memo(({add}) => {
  return <button onClick={add}>child add</button>
});
```
## useRef 和 createRef的区别
> - useRef 仅使用在FunctionComponent中，createRef 仅使用与 classComponent
```js
function App() {
  // 错误用法，永远也拿不到 ref
  const valueRef = React.createRef();
  return <div ref={valueRef} />;
}
```
> - 上述 valueRef 会随着 App 函数的 Render 而重复初始化，这也是 Hooks 的独特之处，虽然用在普通函数中，但在 React 引擎中会得到超出普通函数的表现，比如初始化仅执行一次，或者引用不变。























