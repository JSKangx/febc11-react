// find : 배열의 각 요소에 대해 콜백함수를 실행하여, true를 반환하는 첫번째 요소를 반환.
// true를 반환하는 요소가 없을시 undefined 반환

// 2와 3의 최소공배수 구하기
var array = [6, 4, 1, 9, 2, 5, 10, 7, 8, 3];

var result = 0;

// 기본 sort 메서드로는 숫자를 문자열로 바꿔서 정렬하기 때문에 1다음에 10이 나온다.
// 그래서 콜백 함수를 하나 정의해줘야 한다.
/*
  -를 반환할 경우 a, b 정렬
  +를 반환할 경우 b, a 정렬
  0을 반환할 경우 그대로
*/
array.sort((a, b) => a - b);

var result = array.find(num => num % 2 === 0 && num % 3 === 0);

console.log(result);
