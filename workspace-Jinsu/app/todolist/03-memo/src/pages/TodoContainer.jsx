import Todo from '@pages/Todo';
import ToDoReducer from '@pages/TodoReducer';
import { useCallback, useReducer, useRef } from 'react';

const TodoContainer = () => {
  // 샘플 목록 상태
  const sampleItemList = [
    { _id: 1, title: '두부', done: true },
    { _id: 2, title: '계란', done: false },
    { _id: 3, title: '라면', done: true },
    { _id: 4, title: '치킨', done: true },
  ];

  // for (let i = 5; i <= 10000; i++) {
  //   sampleItemList.push({ _id: i, title: `샘플-${i}`, done: false });
  // }

  const [itemList, itemListDispatch] = useReducer(ToDoReducer, sampleItemList);
  const nextId = useRef(sampleItemList.length + 1);

  // 할일 추가
  // useCallback으로 함수를 메모이제이션 해야 함.
  const addItem = title => {
    itemListDispatch({
      type: 'ADD',
      value: { _id: nextId.current, title: title, done: false },
    });
    nextId.current += 1;
  };

  // 할일 완료/미완료 처리
  // useCallback으로 함수를 메모이제이션 해야 함.
  const toggleDone = useCallback(_id => {
    itemListDispatch({
      type: 'TOGGLE',
      value: { _id },
    });
  }, []);

  // 할일 삭제
  const deleteItem = useCallback(_id => {
    itemListDispatch({
      type: 'DELETE',
      value: { _id },
    });
  }, []);

  return (
    <Todo itemList={itemList} addItem={addItem} toggleDone={toggleDone} deleteItem={deleteItem} />
  );
};

export default TodoContainer;
