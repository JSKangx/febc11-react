// 액션 이름을 지정해 주는 객체
export const COUNTER_ACTION = {
  UP: 'countUp',
  DOWN: 'countDown',
  RESET: 'countReset',
};

// 액션을 생성해서 반환해주는 함수
const counterActionCreator = {
  // 객체를 반환하는 메소드 3개 정의. 이 객체를 액션 객체라고 한다.
  // 사용 예시 : counterActionCreator.countUp(2);
  // { type: 'countUp', payload: { step: 2 } }
  countUp: (step) => ({ type: COUNTER_ACTION.UP, payload: { step } }),
  countDown: (step) => ({ type: COUNTER_ACTION.DOWN, payload: { step } }),
  countReset: () => ({ type: COUNTER_ACTION.RESET }),
};

export default counterActionCreator;
