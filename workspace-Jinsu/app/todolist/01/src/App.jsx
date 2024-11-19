import Footer from '@components/Footer';
import Header from '@components/Header';
import Todo from '@pages/Todo';
import { useState } from 'react';
import { produce } from 'immer';

function App() {
  // 샘플 목록 상태
  const [itemList, setItemList] = useState([
    { _id: 1, title: '두부', done: true },
    { _id: 2, title: '계란', done: false },
    { _id: 3, title: '라면', done: true },
  ]);

  // 할일 추가
  const addItem = item => {
    // 새로운 배열을 만들어 push해 주고, 새로운 배열을 set해주면 된다.
    const newItemList = [...itemList, item];
    setItemList(newItemList);
  };

  // 할일 완료/미완료 처리
  const toggleDone = _id => {
    // immer 라이브러리를 이용한 상태 불변성 유지 & 리렌더링
    // 객체 안에 하나의 속성에 대해서만 바꾸는 거기 때문에 immer를 써야 불변성 유지 가능.
    const newItemList = produce(itemList, draft => {
      const item = draft.find(item => item._id === _id);
      item.done = !item.done;
    });

    setItemList(newItemList);
  };

  // 할일 삭제
  const deleteItem = _id => {
    // 할일 삭제할 때는 배열 안에 객체를 통으로 제거하는 것이기 때문에 immer를 안 써도 불변성 유지 가능.
    const newItemList = itemList.filter(item => item._id !== _id);
    setItemList(newItemList);
  };

  return (
    <div id='todo'>
      <Header />
      <Todo itemList={itemList} addItem={addItem} toggleDone={toggleDone} deleteItem={deleteItem} />
      <Footer />
    </div>
  );
}

export default App;
