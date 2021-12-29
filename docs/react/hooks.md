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
> - 上面的代码虽然使用了 memo 优化，但是点击父组件的 add 还是会使得子组件重复渲染；
> - 需要使用 `useMemo或者useCallback`优化
> - useCallback 其实是 useMemo 的语法糖 

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
