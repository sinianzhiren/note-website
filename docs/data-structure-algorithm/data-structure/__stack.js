// (())

const isValid = (str) => {
  if (str.length % 2 !== 0) return false;
  const stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(' || str[i] === '[' || str[i] === '{') {
      stack.push(str[i]);
    }
    else {
      if (
        (str[i] === ')' && stack[stack.length - 1] === '(') ||
        (str[i] === ']' && stack[stack.length - 1] === '[') ||
        (str[i] === '}' && stack[stack.length - 1] === '{')
      ) {
        stack.pop();
      }
      else {
        return false;
      }
    }
  }

  return stack.length === 0;
};
console.log(isValid("()[]{}"));
