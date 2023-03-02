---
title: typeScript 学习笔记
---

## 数据类型
### 原始类型
> - boolean
> - string
> - number
> - null
> - undefined
> - symbol
> - BigInt

```typescript
let isBool: boolean = false;
let str: string = 'qq';
let num: number = 12;
```

### 空值 void
> - 表示没有任何返回值的函数
```typescript
function alertName(): void {
  alert('hello');
}
```

### null 和 undefined
> - undefined 和 null 是所有类型的子类型，意味着你可以将 undefined 的变量赋值给其他类型的变量
```typescript
let u: undefined = undefined;
let n: null = null;
let a: number = u; // ✅
```

### any 任意类型的值
> - 声明一个类型为任意类型后，如果不干预，那么任何操作返回的内容类型都为any
> - 变量如果在声明的时候未指定类型，那么默认会被识别为 any 类型
```typescript
let str: any = 12;
str = 'aaa'; // ✅

let someThing;
someThing = 7;
someThing = 'seven';
someThing.indexOf('s');
// 等价于
let someThing: any;
```

## 类型推断
> - TypeScript 会在没有明确的指定类型的时候推测出一个类型；
> - `定义的时候如果没有赋值，那么typescript会默认推断出为一个any类型，不会被类型检查`；

## 联合类型
> - 表示取值可以是多种类型中的一种；
```typescript
let strAndNum: string | number;
strAndNum = 1;
strAndNum = 'aaa';
```
### 访问联合类型的属性和方法
```typescript
function getLength(someThing: string | number): number {
  return `${someThing}`.length;
}
function getString(str: string | number): string {
  return str.toString();
}
```
## 数组类型
```typescript
let fib: number[] = [1,1,2,3,5];
```
### 数组泛型
```typescript
let fib: Array<number> = [1,1,2,3,5]
```
### 接口表示数组
```typescript
interface NumberArray {
  [index: number]: number;
}
let fib: NumberArray = [1,1,2,3,5];
```
### 类数组(用接口表示)
```typescript
function sum() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
}
```

## 函数类型
### 函数声明
```typescript
function sum(x: number, y: number): number {
  return x + y;
}
```

### 函数表达式
```typescript
const sum1 = function (x: number, y: number): number {
  return x + y;
};

const sum2: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
};
```

### 接口定义函数类型
```typescript
interface IFn {
  (x: number, y: number): number;
  getName(): string;
}
let myFn: IFn = function (x:number, y: number): number {
  return x + y;
};
```

### 函数可选参数
> - 可选参数后面不允许在出现必选参数
```typescript
function sum(x: number, y?: number): number {
  return y? x + y : x;
}
```

### 参数默认值
> - ts 会将添加了默认值的参数识别为可选参数
> - 不受可选参数
```typescript
function sum(x: number = 0, y: number): number {
  return x + y;
}
sum(undefined, 2);
```




















