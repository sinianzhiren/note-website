---
title: react dom api
---

## render
> 将 react 组件挂载在一个 真实dom节点中。
>  - 接收两个参数： 组件，真实的dom节点。
>  - 第一次执行render 函数时，将替换 root 节点内的所有dom。

```typescript jsx
import React from "react";
import ReactDOM from "react-dom";

const App = () => <div>App</div>;
ReactDOM.render(<App />, document.getElementById("root"));
```

## hydrate
> 此方法用于服务端渲染
> - 此方法将对 ReactDomServer 渲染的html 进行事件绑定

```typescript jsx
ReactDOM.hydrate(<App />, document.getElementById('app'));
```

## unmountComponentAtNode
> 卸载 React 的根节点, 将删除此组件下的 所有状态包括定义的 事件监听函数等

```typescript jsx

```
