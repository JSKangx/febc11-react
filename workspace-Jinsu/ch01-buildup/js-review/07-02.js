// .map : 배열의 각 요소에 대해 콜백 함수를 실행한 값을 새로운 배열로 반환함.

// 배열 요소 중 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = 0;

// map으로 홀수의 합계 구하기
var newArray = array.map(num => (num % 2 ? num : 0));
newArray.forEach(num => (result += num));

console.log(result);
