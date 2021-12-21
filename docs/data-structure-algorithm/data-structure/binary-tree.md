---
title: 二叉树
---

## 二叉树的遍历
### 按照顺序分类
> - 先序遍历
> - 中序遍历
> - 后序遍历
> - 层次遍历

### 按照遍历方式
> - 递归的遍历(先序，中序，后序)
> - 迭代遍历（层次遍历）

*<span style={{color: 'red'}}>注意：先序，中序，后序是相对于root节点来说的，root最开始，root在中间，root在最后遍历到</span>*

*递归函数的编写逻辑：*
- 递归式：比如先序遍历，就是 根节点 -> 左子树 -> 右子树
- 递归边界：就是什么时候停止下来；当遍历的树为空的时候就停止

```javascript
// 创建二叉树的节点
function CreateNode(val) {
  this.val = val;
  this.left = this.right = null;
}
```

```javascript
// 遍历的事例
const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
};
```

```javascript
// 先序遍历 root -> left -> right
const firstMap = (tree) => {
  if (!tree) {
    return;
  }
  console.log('当前值：', tree.val);
  firstMap(tree.left);
  firstMap(tree.right);
};

// firstMap(tree);

// 中序遍历 left -> root -> right
const middleMap = tree => {
  if (!tree) {
    return;
  }
  middleMap(tree.left);
  console.log(tree.val);
  middleMap(tree.right);
};

// middleMap(tree);

// 后续遍历 left -> right -> root
const lastMap = tree => {
  if (!tree) {
    return;
  }
  lastMap(tree.left);
  lastMap(tree.right);
  console.log(tree.val);
};
// lastMap(tree);
```



