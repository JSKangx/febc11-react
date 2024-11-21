import { produce } from 'immer';

// state, action을 전달받고 새로운 state를 반환하는 순수 함수
function ToDoReducer(state, action) {
  const targetIndex = state.findIndex(item => item._id === action.value._id);
  let newState = [...state];

  switch (action.type) {
    case 'ADD':
      // 추가는 immer를 안 써도 되지만, 통일성을 위해 쓴다.
      newState = produce(state, draft => {
        draft.push(action.value);
      });
      break;
    case 'TOGGLE':
      newState = produce(state, draft => {
        draft[targetIndex].done = !draft[targetIndex].done;
      });
      break;
    case 'DELETE':
      newState = produce(state, draft => {
        draft.splice(targetIndex, 1);
      });
      break;
    default:
      newState = state;
  }

  return newState;
}

export default ToDoReducer;
