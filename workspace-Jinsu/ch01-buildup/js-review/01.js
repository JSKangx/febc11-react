var arr = [10, 20, 30];

// 하드 코딩 : 각 요소의 제곱값으로 구성된 새로운 배열 생성
// var arr2 = [100, 400, 900];

// 여러가지 방식으로 arr2를 만들어보자
// (1) for
var arr2 = [];
for (let i = 0; i < arr.length; i++) {
  arr2.push(arr[i] * arr[i]);
}

// (2) for of
var arr2 = [];
for (const item of arr) {
  arr2.push(item * item);
}

// (3) forEach()
var arr2 = [];
arr.forEach(function (item) {
  arr2.push(item * item);
});

// (4) map
var arr2 = [];
arr2 = arr.map(function (item) {
  return item * item;
});

// (5) forEach, map의 콜백함수를 화살표 함수로
var arr2 = [];
arr.forEach(item => arr2.push(item * item));

var arr2 = [];
arr2 = arr.map(item => item * item);

console.log(arr2); // [100, 400, 900]
