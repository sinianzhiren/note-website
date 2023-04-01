let isBool: boolean = false;

let u: undefined = null;
let a: number = u;
console.log(a);

let v: void;
// a = v;

let someThing;
someThing = 7;
someThing = "seven";
someThing.indexOf("s");

function getLength(someThing: string | number): number {
  return `${someThing}`.length;
}

function getString(str: string | number): string {
  return str.toString();
}

interface IPerson {
  name: string;
  [propName: string]: unknown;
  age?: number;
}

const sum1 = function (x: number, y: number): number {
  return x + y;
};

const sum2: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};

interface IFn {
  (x: number, y: number): number;
}

let myFn: IFn = function (x: number, y: number): number {
  return x + y;
};

function sum(x: number = 0, y: number): number {
  return x + y;
}

console.log(sum(null, 2));

type valuesOf<T> = T[keyof T];

interface Animal {
  name: string;
  age: number;
}

type B = valuesOf<Animal>;
