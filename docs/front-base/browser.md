---
title: 浏览器知识 
---

## 事件机制
> 1. 捕获（window -> 事件触发处）
> 2. 传播到事件触发处
> 3. 冒泡（事件触发处 -> window）

## 注册事件
> 1. on
> 2. `addEventListener`
>   - 第三个参数可以是个对象，也可以是个Boolean值，默认为 false(事件冒泡)
>   - 第三个参数对象的是有如下属性：
>       - capture：布尔值，和 useCapture 作用一样     
>       - once：布尔值，值为 true 表示该回调只会调用一次，调用后会移除监听     
>       - passive：布尔值，表示永远不会调用 preventDefault  
     
*使用 stopPropagation 来阻止事件的进一步传播。通常我们认为 stopPropagation 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。stopImmediatePropagation 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。*

## 事件代理
> 子节点是动态生成的，需要注册到父节点上，节省内存开销，不要给子节点注销事件

## 跨域
> 协议，域名，端口不一样就会产生跨域

### 解决方案：
> - jsonp；只适用get请求；
> - cors, 需要浏览器和后端的支持，服务端设置：`Access-Control-Allow-Origin`, 就可以开启 cors, 表示哪些域名可以访问该资源，该方式下会分为简单请求和复杂请求；
>   - 简单请求：
>       - 使用下面方法之一：
>           - GET
>           - HEAD
>           - POST
>       - content-type仅限下面三者之一：
>           - text/plain
>           - multipart/form-data
>           - application/x-www-form-urlencoded
>   - 复杂请求：不满足上面的条件就是复杂请求，复杂请求首先会发一个预请求，method：option；
> - document.domain: 只适用二级域名，比如 a.test.com 和 b.test.com, 只需要在页面添加，`document.domain='test.com'`
> - postMessage：这种方式通常用于获取嵌入页面中的第三方页面数据。一个页面发送消息，另一个页面判断来源并接收消息
```javascript
// 发送消息端
window.parent.postMessage('message', 'http://test.com')
// 接收消息端
var mc = new MessageChannel()
mc.addEventListener('message', event => {
  var origin = event.origin || event.originalEvent.origin
  if (origin === 'http://test.com') {
    console.log('验证通过')
  }
})
```
## 存储
### cookie
> 一般由服务器生成，可以设置过期时间，4K大小，每次请求的时候，header都会携带上，会影响性能。
### localStorage
### sessionStorage
### indexDB

## server worker
> 运行在浏览器背后的独立线程，一般用来实现缓存功能；

## 浏览器缓存机制


## 浏览器渲染原理


> 为什么操作dom慢
> 1. dom属于渲染引擎层面的东西，而操作dom属于js引擎，那么势必会出现两个引擎之间的通信，那么就会出现性能上的损耗，操作dom还会出现
>回流或者重绘，那么就会出现损耗；

> 插入几万个dom不会使得页面卡顿？
> 1. 使用requestAnimationFrame 循环的插入dom, 
> 2. 虚拟滚动（virtualized scroller）只渲染可视化区域的内容，非可视化区域外部的内容完全不渲染，只有当滚动的时候再去实时的替换；

## 回流（重排）和重绘
> - 重绘：当节点的外观发生改变不影响布局，浏览器从新渲染就是重绘，如color变化
> - 回流：节点的布局或者尺寸发生变化，浏览器重新渲染就是回流；

**回流必定引起重绘，但是重绘不一定，引起回流，回流的成本比重绘的成本更高**
> - 使用transform代替top/left/bottom/right    
>   - 原因是：transform会创建一个独立的渲染合成层，并且调用GPU加速渲染；类似合成层的有，`canvas，video，flash，css滤镜等`
> - 使用 `visibility` 代理 `display: none`, 前者只是重绘，后者会引起回流    
> - 不要把节点的属性放在循环里面当成一个循环变量；   
> - 不要使用table布局，一个小的改动都可能引起回流；    
> - css选择器的匹配是从右到左的规则，应该避免层级过多；   






