// filter : 배열의 각 요소에 대해 콜백함수를 실행하여, true를 반환하는 모든 요소를 배열로 모아서 반환.
// true를 반환하는 요소가 없을시 빈 배열 반환

// 홀수의 합계 구하기
var array = [6, 4, 1, 9, 2, 5, 10, 7, 8, 3];

var result = 0;

array.filter(num => num % 2 !== 0).forEach(num => (result += num));

console.log(result);
