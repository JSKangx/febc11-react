import counterReducer from '@redux/counterReducer';
import { legacy_createStore as createStore } from 'redux';

// store는 Redux가 관리해준다. store에는 우리가 만든 reducer만 전달해주면 된다.
const store = createStore(counterReducer);

export default store;
