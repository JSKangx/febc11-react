// 지정한 수가 소수인지 여부를 반환
// memo라는 함수의 인수로 넘겨주면 메모이제이션 적용 함수가 된다.
var isPrime = memo(function (num) {
  console.time('소요 시간');
  console.log('소수 판별 시작.', num);

  // TODO: 소수 판별 코드
  let prime = num > 1; // 1은 소수가 아님

  for (let i = 2; i < num; i++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }

  console.log('소수 판별 결과.', prime);
  console.timeEnd('소요 시간');
  return prime;
});

// var isPrime = function (num) {
//   // 캐시를 위한 코드
//   // 처음에는 캐시가 없다. 그래서 처음에는 빈 객체로 저장. 함수 실행 이후에 캐시가 생성될텐데, 자기 스스로 자신의 캐시를 저장한다.
//   isPrime._cache = isPrime._cache || {};

//   if (isPrime._cache[num] !== undefined) {
//     // 캐시되어 있음(cache hit) : 이미 계산되어서 결과만 갖다 씀
//     console.log('cache hit!', num, isPrime._cache[num]);
//     return isPrime._cache[num];
//   } else {
//     // 캐시되어 있지 않음 : 소수 판별 다시 해야함.
//     return (isPrime._cache[num] = isPrime2(num)); // 한번 계산한 결과를 _cache에 저장. 예) 십억칠(키) : true(결과) -> 캐시 객체에 이렇게 저장한다.
//   }
// };

// 지금까지는 소수함수에 대해서만 적용했는데, 좀 범용적으로 사용해보자.
// 지정한 함수에 memoization 기능 추가
function memo(fn) {
  // 함수를 리턴해야 한다. 함수를 담갔다 빼야하니까.
  return function (arg) {
    // 캐시를 위한 코드
    // 처음에는 캐시가 없다. 그래서 처음에는 빈 객체로 저장. 함수 실행 이후에 캐시가 생성될텐데, 자기 스스로 자신의 캐시를 저장한다.
    fn._cache = fn._cache || {};

    if (fn._cache[arg] !== undefined) {
      // 캐시되어 있음(cache hit) : 이미 계산되어서 결과만 갖다 씀
      console.log('cache hit!', arg, fn._cache[arg]);
      return fn._cache[arg];
    } else {
      // 캐시되어 있지 않음 : 소수 판별 다시 해야함.
      return (fn._cache[arg] = fn(arg)); // 한번 계산한 결과를 _cache에 저장. 예) 십억칠(키) : true(결과) -> 캐시 객체에 이렇게 저장한다.
    }
  };
}

// memo 함수에 담갔다 꺼내면 memoization 기능을 추가하고 싶다.
// var isPrime = memo(isPrime);

isPrime(1);
isPrime(2);
isPrime(3);
isPrime(4);
isPrime(5);
isPrime(6);
isPrime(7);
isPrime(8);
isPrime(9);
isPrime(1000000007); // 십억칠
isPrime(1000000007);
isPrime(1000000007);
