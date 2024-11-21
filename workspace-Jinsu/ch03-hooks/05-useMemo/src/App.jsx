import { useMemo, useState } from 'react';

var isPrime = function (num) {
  console.time('소요 시간');
  console.log('소수 판별 시작.', num);

  // TODO: 소수 판별 코드
  let prime = num > 1; // 1은 소수가 아님

  for (let i = 2; i < Math.sqrt(num); i++) {
    if (num % i === 0) {
      prime = false;
      break;
    }
  }

  console.log('소수 판별 결과.', prime);
  console.timeEnd('소요 시간');
  return prime;
};

function App() {
  const [name, setName] = useState('GD');
  const [num, setNum] = useState(1);

  // const result = isPrime(num);
  // 위 함수를 메모이제이션 해보자
  // num이 바뀔 때마다 새롭게 계산하긴 해야되기 때문에 deps에 num을 지정.
  // name이 바뀌어도 마지막에 계산했던 num이 그대로면, 계산하지 않고 메모한 것을 출력.
  const result = useMemo(() => isPrime(num), [num]);

  return (
    <>
      <h1>05 useMemo - 함수의 반환값을 memoize</h1>
      <div>
        <input
          type='text'
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        가 좋아하는 숫자:
        <input
          type='number'
          min='1'
          max='1000000007'
          value={num}
          onChange={e => {
            setNum(e.target.value);
          }}
        />
        <div>
          {name}가 좋아하는 숫자 {num}: 소수가{' '}
          {result ? (
            <span style={{ color: 'blue', fontWeight: 'bold' }}>맞습니다.</span>
          ) : (
            <span style={{ color: 'orangered', fontWeight: 'bold' }}>아닙니다.</span>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
