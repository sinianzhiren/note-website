---
title: 使用tailwindcss 和 jsx实现mui的input
---

## material-ui 的input设计还是有自己的风格
> 1. 学习material-ui 自己通过 tailwindcss 实现input效果


### 1. 代码1, label内容收上去，主要是 `.zoomInput:valid + .zoomInputLabel` 和 `required` 实现的
```jsx
// index.jsx
import React from 'react';

import styles from './styles.module.css';

export default function ZoomInput() {
   return (
     <div className="rounded bg-white p-10 shadow-none md:border md:border-gray-300 md:shadow-lg">
        <form>
           <div className="relative">
              <input id="email"
                     className={styles.zoomInput}
                     type="text" required />
              <label htmlFor="email"
                     className={styles.zoomInputLabel}>邮箱</label>
           </div>
        </form>
     </div>
   )
}

// styles.module.css
.root {
    font-family: 'Open Sans', sans-serif;
    @apply relative;
}

.zoomInput {
    transition: border 0.2s ease-in-out;
    min-width: 220px;
    @apply w-full rounded-md border border-gray-400 px-3 pt-5 pb-2;
    @apply focus:border-blue-700 focus:outline-none focus:ring-0 focus:ring-blue-700;
    @apply active:outline-none;
}

.zoomInput:focus + .zoomInputLabel,
.zoomInput:active+.zoomInputLabel,
.zoomInput:valid + .zoomInputLabel,
.zoomInput.filled+.zoomInputLabel {
    font-size: .75rem;
    transition: all 0.2s ease-out;
    top: -0.9rem;
    background-color: #fff;
    color: #1a73e8;
    padding: 0 5px 0 5px;
    margin: 0 5px 0 8px;
}

.zoomInputLabel {
    transition: all 0.2s ease-out;
    top: 0.4rem;
    left: 0;
    @apply absolute mt-2 ml-3 cursor-text text-base text-gray-400;
}
```

### 代码2，
```css
// 下面主要是使用placeholder 的选择器的特性，并且在html结构中 `<input placeholder=" " />`
.input:not(:placeholder-shown) + .label {
        font-size: .75rem;
          transition: all 0.2s ease-out;
          top: -0.9rem;
          background-color: #fff;
          color: #1a73e8;
          padding: 0 5px 0 5px;
          margin: 0 5px 0 5px;
      }
```
将placeholder值设置为空，然后利用伪类选择器