// Promise를 이용한 비동기 함수 흐름 제어

function f1() {
  // f1이 실행할 코드를 담을 함수를 Promise의 콜백함수 안에 입력
  // Promise 콜백 함수의 매개변수 : (작업성공시 실행할 함수, 실패시 실행할 함수)
  return new Promise((resolve, reject) => {
    console.log(`2. f1 작업 시작.`);
    console.log(`3. f1 작업중...`);
    setTimeout(() => {
      // ......
      console.log(`4. f1 작업 종료.`);
      resolve(`f1의 결과물`);
      // reject(new Error('에러 발생'));
    }, 1000);
  });
}

function f2(f1Result) {
  return new Promise((resolve, reject) => {
    console.log(`5. ${f1Result}로 f2 작업 시작.`);
    console.log(`6. f2 작업중...`);
    setTimeout(() => {
      // ......
      console.log(`7. f2 작업 종료.`);
      resolve(`최종 결과물`);
      // reject(new Error('에러 발생'));
    }, Math.random() * 2000);
  });
}

function test() {
  // f1()
  //   .then(f1Result => {
  //     f2(f1Result)
  //       .then(result => {
  //         console.log('8', result);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // callback을 쓰는 것보다 오히려 더 복잡해진 느낌?

  // 아래와 같이 해보자.
  f1()
    .then(f2)
    .then(result => console.log('8', result))
    .catch(err => console.log(err)); // f1, f2에서 발생한 오류 둘 다 이문장 하나로 제어 가능.
}

console.log('1. 테스트 시작.');
test();
console.log('9. 테스트 완료.');
