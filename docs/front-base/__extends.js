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

// proxy
const onWatch = (obj, setBind, getLogger) => {
  const handler = {
    get(target, property, receiver) {
      getLogger(target, property);
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      setBind(value, property);
      return Reflect.set(target, property, value, receiver);
    }
  };
  return new Proxy(obj, handler);
};

const obj = {a: 1};
const p = onWatch(obj,
  (v, property) => {
    console.log(v, property);
  },
  (target, property) => {
    console.log(target);
    console.log(property);
  }
);
