---
title: react18新特性
---

## 新api
> 1. startTransition
> 2. useTransition
> 3. useDeferredValue

*上述的三个新的api离不开一个概念transition（过渡）*

> 在大屏幕视图更新的时，startTransition 能够保持页面有响应，这个 api 能够把 React 更新标记成一个特殊的更新类型 transitions ，在这种特殊的更新下，React 能够保持视觉反馈和浏览器的正常响应。

### 使用场景
> react 在18以前所有的更新任务都被视为是急迫的任务，，在react18以后，诞生了concurrent mode模式，在这个模式下，渲染是可以中断的，可以降低优先级，让高优先级的执行，react 18更注重用户的体验问题，从concurrent mode 到 suspone 到 startTransition 无疑是围绕着如何提升用户体验的；    
> startTransition 需要在 concurrent mode 模式（渲染并发）下运行，

**传统模式**
```javascript
import ReactDOM from "react-dom";

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
```
**react18并发模式**
```javascript
import ReactDOM from "react-dom";

const root = ReactDOM.creatRoot(document.getElementById('app'));
root.render(<App />);
```

### startTransition
> 例如：一个input搜索框加一个列表的场景，可以将该场景拆分为两个任务区：   
> 1. 及时的展示用户在input输入框中输入的内容
> 2. 展示用户通过搜索内容渲染出新的列表

> 从上述两个场景中我们可以看出第一个任务相比于第二个任务优先级更高，传统情况下，当列表的数据量比较大的时候，用户的输入就可能无法及时的展示在输入框中，影响用户体验，加入了startTransition 就可以使得更新列表的渲染操作变得滞后一点，提高用户体验；

**传统写法**
```javascript
const handleChange = (e) => {
  // 设置搜索条件
  setInputValue(e.target.value);
  // 改变搜索过滤后列表的状态
  setSearchQuery(e.target.value);
}
```

**startTransition写法**
```javascript
const handleChange = (e) => {
  setInputValue(e.taget.value);
  startTransition(() => {
    setSearchQuery(e.target.value);
  })
}
```
或许你有这样的疑问，使用setTimeout也可以实现这样的效果，setTimeout 属于宏任务，而事件也是属于宏任务，所以setTiemout本质上还是会影响页面的交互；

比较setTimeout 和 startTransition的优劣：
> - setTimeout和startTransition处理上有一个本质的逻辑，setTimeout是异步宏任务，而 startTransition内部的回调函数是同步任务，只是在执行内部的渲染的时候会打上 `transition` 的标记，react在更新的时候，会识别这个标记，并且跳过这次更新，transition相比于setTimeout来说是更早的执行，同时保证UI的可交互性；
> - 对于渲染的并发场景下，setTimeout会使得页面，setTiemout超时后还是会执行代码逻辑，属于宏任务，还是可能会阻塞页面的交互; startTransition是让浏览器空闲的时候再去执行代码逻辑，不会引起卡顿；

**为什么不是节流或者防抖呢**
> - 一方面，节流防抖 本质上也是 setTimeout ，只不过控制了执行的频率，那么通过打印的内容就能发现，原理就是让 render 次数减少了。而 transitions 和它相比，并没有减少渲染的次数。
> - 另一方面，节流和防抖需要有效掌握 Delay Time 延时时间，如果时间过长，那么给人一种渲染滞后的感觉，如果时间过短，那么就类似于 setTimeout(fn,0) 还会造成前面的问题。而 startTransition 就不需要考虑这么多。

### useTransition
> useTransition = useState + startTransition
> useTransition 用来设置一个过渡期的，在这个过渡期内需要展示什么，什么时候展示等，用法和 useState类似；
```javascript
import { useTransition } from 'react';
// startTransition和上面的用法一样
// ispending = true 表示过渡期，false可以正常渲染
const [ispending, startTransition] = useTransition();
if (ispending) return <Spinner />;
```

### useDeferredValue
> useDeferredValue = useEffect + transition
> useDeferredValue 可以让一个状态滞后被派生；和startTransition实现的效果类似，当迫切的任务执行后才再得到新的状态，这个新的状态称之为 deferredValue;   
> 不同点：startTransition 是把函数内部的任务变为了一个过渡任务，而 useDeferredValue 是把原始值通过内部的过渡任务得到一个新的值，这个值作为延时状态；一个是处理一段逻辑，一个是产生一个新的值；
> 从源码中得知 useDeferredValue 内部使用了 useEffect ，逻辑在useEffect中执行的，useEffect 内部的逻辑是异步的，所以在一定程度上 useDeferredValue 滞后于 startTransition;

```javascript
function App(){
    const [ value ,setInputValue ] = React.useState('')
    const query = React.useDeferredValue(value)
    const handleChange = (e) => {
        setInputValue(e.target.value)
    }
    return  <div>
     <button>useDeferredValue</button>
    <input onChange={handleChange}
        placeholder="输入搜索内容"
        value={value}
    />
   <NewList  query={query} />
   </div>
}
```

## 总结
1. 讲了 `startTransition`
2. 讲了 `useTransition`
3. 讲了 `useDeferredValue`

*参考文章*      
> 1. https://mp.weixin.qq.com/s/8x1Zgv0bNxYf8Ur3Jg_eoA 
