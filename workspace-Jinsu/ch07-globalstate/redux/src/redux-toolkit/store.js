import counterSlice from '@redux-toolkit/counterSlice';
import { configureStore } from '@reduxjs/toolkit';

// store는 Redux가 관리해준다. store에는 우리가 만든 reducer만 전달해주면 된다.
const store = configureStore({
  reducer: {
    counterStore: counterSlice.reducer,
  },
});

export default store;
