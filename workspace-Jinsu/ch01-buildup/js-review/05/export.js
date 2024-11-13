// 그냥 export하면 named export이다. 함수 이름 그대로 export 된다.
export function plus(x, y) {
  return x + y;
}

export function minus(x, y) {
  return x - y;
}

// export default는 한 파일에서 한 번만 쓸 수 있다.
export function multiple(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function sum(kor, eng, math) {
  return kor + eng + math;
}

export function avg(kor, eng, math) {
  return sum(kor, eng, math) / 3;
}

// 객체로 여러개를 export할 수 있다.
export default { plus, minus, multiple, divide, sum, avg };
