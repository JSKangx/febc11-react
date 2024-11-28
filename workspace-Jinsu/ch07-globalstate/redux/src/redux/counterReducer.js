import { COUNTER_ACTION } from '@redux/counterActionCreator';

// 초기 state값. 최초에는 state가 넘어오지 않을 것이기 때문에 기본값 설정 필요.
const initialState = { count: 5 };

// state: 이전 상태(store가 내부적으로 관리, 이전의 리턴값이 다음의 state로 전달)
// 그런데 상태가 복합객체일 경우 상태 직접 접근해서 수정하면 불변성 유지가 안 된다.
// immer 같은 라이브러리 써서 해야 한다.
// acition: 동작을 정의한 객체 (자유롭게 작성)
// 예시 - { type: 'countUp', payload: { step: 2 } }
// 현재 상태와 action 객체를 받아서 새로운 상태를 반환하는 순수 함수
// 리턴값 : 새로운 상태
function counterReducer(state = initialState, action) {
  // action.type 값에 따라 해야 할 동작이 달라짐
  switch (action.type) {
    case COUNTER_ACTION.UP:
      // 불변성을 지키지 않는 코드
      // state.count += action.payload.step;
      // return state;

      // 새로운 객체를 만들고 기존 객체 내부의 원시값을 그대로 스프레드 연산자로 복사해 왔음.
      // count 속성만 변경하면 되기 때문에 count에 대한 것만 설정해줌
      return { ...state, count: (state.count += action.payload.step) };
    case COUNTER_ACTION.DOWN:
      return { ...state, count: (state.count -= action.payload.step) };
    case COUNTER_ACTION.RESET:
      return { ...state, count: 0 };
    default:
      return state;
  }
}

export default counterReducer;
