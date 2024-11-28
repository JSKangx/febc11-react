import { createSlice } from '@reduxjs/toolkit';

// slice를 이용하면 reducer와 action creator를 간단하게 작성 가능
// 반환값 { reducer, actions, ... }
// reducer : reducers에 등록해 놓은 함수. Redux 스토어에 전달해야 함.
// actions : 각 리듀서에 해당하는 action 생성자 객체
const counterSlice = createSlice({
  name: 'myCounter', // 슬라이스 식별자(액션 타입의 접두사로 사용됨)
  initialState: { count: 10 },
  // 실행할 것을 독립적인 함수로 만들어주면 됨
  reducers: {
    countUp: (state, action) => {
      // redux toolkit은 내부적으로 immer 라이브러리를 사용하기 때문에 state를 직접 수정해도 불변성이 유지됨.
      // 데이터는 payload 속성에 넘어온다고 정해져있음.
      state.count += action.payload;
    },
    countDown: (state, action) => {
      state.count -= action.payload;
    },
    countReset: (state) => {
      state.count = 0;
    },
  },
});

// 액션 생성자 함수를 자동으로 생성해준다.
// countUp(2) => { type: 'mycounter_countUp', payload: 2 }
export const { countUp, countDown, countReset } = counterSlice.actions;

export default counterSlice;
