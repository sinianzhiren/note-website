// 组合继承

function Parent(val) {
  this.value = val;
}

Parent.prototype.getValue = function () {
  return this.value;
};

function Child(val) {
  Parent.call(this, val);
}

Child.prototype = new Parent();

const child = new Child(10);
console.log(child.getValue());


// 寄生组合继承
function f() {
  function Parent(val) {
    this.value = val;
  }

  Parent.prototype.getValue = function () {
    return this.value;
  };

  function Child(val) {
    Parent.call(this, val);
  }

  Child.prototype = Object.create(Parent.prototype, {
    constructor: {
      value: Child,
      writable: true,
      configurable: true,
      enumerable: false
    }
  });

  const child = new Child(12);
  console.log(child.getValue());
}

// class继承
class Animal {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

class Cat extends Animal {
  constructor(value) {
    super(value);
    this.name = value;
  }
}

const cat = new Cat('汤圆');
console.log(cat.getName());
