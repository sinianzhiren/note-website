---
title: 数据结构
---

## 链表
```javascript
function Node(el) {
  this.node = el;
  this.next = null;

}

function List() {
  this.head = new Node('head');
}

List.prototype = {
  find: function (element) {
    let currentEl = this.head;
    while (element !== currentEl.node) {
      currentEl = currentEl.next;
    }
    return currentEl;
  },
  insert: function (newel, el) {
    let newNode = new Node(newel);
    let curNode = this.find(el);
    newNode.next = curNode.next;
    curNode.next = newNode;
    return this.head;
  },
  display: function () {
    let curNode = this.head;
    while (curNode.next !== null) {
      // 只展示有数据的节点
      console.log(curNode.next.node);
      curNode = curNode.next;
    }
  }
};

// eg
let list = new List();
list.insert('夏威夷', 'head');
list.insert('菲律宾', '夏威夷');
list.insert('拉斯维加斯', '菲律宾');
console.log(list.display());
```
