---
title: CSS基础知识
---

## BFC
前置知识：
1. 普通流：按照HTML文档的方式从上到下从左到右布局；
2. 浮动：脱离普通的文档流，按照元素的浮动方向进行偏移；类似于印刷排版中的文字环绕的例子；
3. 绝对定位：脱离普通文档流，不会影响正常的兄弟元素，元素的具体位置由绝对定位的坐标决定；

> bfc叫做块级格式化上下文；是页面上一块渲染区域，有自己的渲染规则，决定子元素如何布局，和其他元素的关系；
> 具有bfc特性的元素可以看做是独立的容器，容器内部的元素不会影响到外部的元素，并且容器内部有一些独特的特性；

**形成bfc的条件（任意一个即可）：**
> 1. 根元素
> 2. 浮动元素，除了float: none的其他属性
> 3. 绝对定位元素，position, (absolute, fixed)
> 4. display为，inline-block, flex, table-cells
> 5. overflow除了visible以外的其他值

**bfc规则：**
> 1. 内部的box将会独占宽度，并且在垂直方向上一个接着一个排列
> 2. box在垂直方向的间距由margin决定，并且同一个BFC内两个相邻的box之间的margin会被折叠；
> 3. 每个box在水平方向上的左边缘与BFC的左边缘对齐，浮动也是如此；
> 4. BFC区域不会与浮动元素重叠，而是会依次排列；
> 5. BFC是一个独立区域，不会与外面的容器产生干扰；
> 6. 浮动元素的高度也参与BFC高度计算；

**重要信息：**
> 1. 边距折叠（上下margin）
> 2. 清除浮动 （BFC overflow：hidden）
> 3. 自适应多栏布局 （BFC与浮动元素之间形成 overflow：hidden）

> *参考文章：[10分钟理解BFC原理](https://zhuanlan.zhihu.com/p/25321647)*

## 居中
### 居中元素定宽高
**absolute + 负边距**
```css
wp {
  position: relative;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
}
```

**absolute + calc**
```css
.box {
  position: absolute;
  left: calc(50% - 50px);
  top: calc(50% - 50px);
}
```

**absolute + margin auto**
```css
.box {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
}
```

### 居中元素不定宽高
**absolute + translate**
```css
.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

**line-height**
```css
.wp {
  line-height: 300px;
  text-align: center;
  font-size: 0;
}
.box {
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  line-height: inherit;
  /*修正文字*/
  text-align: left; 
}
```
**table cell**
```css
.wp {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.box {
  display: inline-block;
}
```

**flex**
```css
.wp {
  display: flex;
  align-content: center;
  justify-content: center;
}
```
**grid**
```css
.wp {
  display: grid;
}

.box {
  align-self: center;
  justify-self: center;
}
```


