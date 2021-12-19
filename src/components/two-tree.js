let tree = {
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

// 先序遍历
const firstMap = (tree) => {
  if (!tree) {
    return;
  }
  console.log('当前值：', tree.val);
  firstMap(tree.left);
  firstMap(tree.right);
};

// firstMap(tree);

// 中序遍历
const middleMap = tree => {
  if (!tree) {
    return;
  }
  middleMap(tree.left);
  console.log(tree.val);
  middleMap(tree.right);
};

// middleMap(tree);

// 后续遍历
const lastMap = tree => {
  if (!tree) {
    return;
  }
  lastMap(tree.left);
  lastMap(tree.right);
  console.log(tree.val);
};
// lastMap(tree);
