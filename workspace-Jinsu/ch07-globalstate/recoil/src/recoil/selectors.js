import { countState } from '@recoil/atoms';
import { selector } from 'recoil';

// atom은 값 그대로 넘겨주지만, seletor는 get을 통해 가공된 값을 넘겨줌
export const countStateKor = selector({
  key: 'korCount', // atom 식별자로 모든 atom 에서 고유해야 함.
  // get의 인자값에는 get이라는 기존의 atom값을 꺼낼 수 있는 getter함수가 전달됨
  get: ({ get }) => {
    const count = get(countState);
    return numberToKorean(count);
  },
});

function numberToKorean(number) {
  const koreanNumbers = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
  const koreanUnits = ['', '십', '백', '천'];

  const result = [];
  let idx = 0;
  let hasNonZero = false; // 0 이외의 숫자가 있는지 체크하기 위한 변수

  while (number > 0) {
    const digit = number % 10;
    const unit = koreanUnits[idx % 4];

    if (digit !== 0) {
      if (digit === 1 && unit !== '') {
        // 단위가 있고, 현재 자리수가 1인 경우에는 '일'을 생략
        result.unshift(unit);
      } else {
        result.unshift(koreanNumbers[digit] + unit);
      }
      hasNonZero = true; // 0 이외의 숫자가 있는 것을 표시
    } else if (hasNonZero && result[0] !== '백') {
      // 0 이외의 숫자가 있는 경우에만 일의 자리를 처리하고, '백'일 경우에는 생략
      result.unshift('영');
    }

    number = Math.floor(number / 10);
    idx++;
  }

  return result.join('');
}
