---
title: React技巧
---

## render props
> - 父组件中渲染子组件的时候，通过子组件上传入一个render函数，这个render函数返回需要渲染的内容，
>子组件通过 `this.props.render调用`
> - 好处：组件和业务的一个解耦，可以更好的替换需要渲染的内容 

```jsx harmony
// 父组件
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```
```jsx harmony
// 子组件
class DataProvider extends React.Component {
    state = {
        data: {
            target: 'World'
        }
    }
    render() {
        return this.props.render(this.state)
    }
}
```
