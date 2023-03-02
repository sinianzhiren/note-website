---
title: ts类型守卫
---

> ts 类型守卫是可以在运行的时候，做一种类型判断，用于确保类型在一定的范围内；  
> 目前有四种方式来保护

### 1. in 关键字
```ts
interface Admin {
  name: string;
  privileges: string[];
}
interface Employee {
  name: string;
  startDate: Date;
}
type UnknownEmployee = Admin | Employee;
function printType(emp: UnknownEmployee) {
  if ('startDate' in emp) {
    console.log(emp.startDate)
  }
  if ('privileges' in emp) {
    console.log(emp.privileges)
  }
}
```

### 2. typeof 关键字

### 3. instanceof 关键字

### 4. 自定义类型保护的类型谓词
```ts
function isNumber(x: any): x is number {
   return typeof x === "number";
}
function isString(x: any): x is string {
   return typeof x === "string";
}
```

