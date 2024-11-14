// reduce(callback[, initialValue]) : 배열의 각 요소에 대해 콜백함수를 실행
// callback(accumulator(누적값), currentValue(현재값), index(현재), array(원본))
// initialValue가 주어지면, 누적값의 초기값으로 사용하고,
// initialValue가 주어지지 않으면, 배열의 첫번째 요소가 누적값의 초기값으로 사용되고, 두번째 요소부터 콜백 함수가 호출

// 홀수의 합계 구하기
var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 초기값을 안 주면 첫 원소가 짝수일 때 그것이 sum이 되어버린다. 원하는 결과를 얻고 싶으면 초기값을 세팅하자.
var result = array.reduce((sum, currentNum) => {
  if (currentNum % 2 !== 0) {
    return sum + currentNum; // 홀수일 때 sum에 num을 누적해서 반환
  } else {
    return sum; // 짝수일 때 이전 sum을 그대로 반환
  }
}, 0);

// 삼항연산자로 더 간단하게 표현
var result = array.reduce((sum, num) => {
  return num % 2 ? sum + num : sum;
}, 0);

// 더 축약 (괄호, return 생략)
var result = array.reduce((sum, num) => (num % 2 ? sum + num : sum), 0);

// 더더 축약 (논리 곱 연산자)
var result = array.reduce((sum, num) => (sum += num % 2 && num), 0);

console.log(result);
