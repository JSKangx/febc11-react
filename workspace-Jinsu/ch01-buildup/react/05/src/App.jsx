import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Todo from './pages/Todo';

function App() {
  // 샘플 목록 상태
  const [itemList, setItemList] = useState([
    { _id: 1, title: '두부', done: true },
    { _id: 2, title: '계란', done: false },
    { _id: 3, title: '라면', done: true },
  ]);

  // 할일 추가
  const addItem = (item) => {
    // 새로운 배열을 만들어 push해 주고, 새로운 배열을 set해주면 된다.
    const newItemList = [...itemList, item];
    setItemList(newItemList);
  };

  // 할일 완료/미완료 처리
  const toggleDone = (_id) => {
    // 상태 변경
    const item = itemList.find((item) => item._id === _id);
    // 원 배열 변경
    item.done = !item.done;
    // 배열 깊은 복사 후 데이터 변경
    setItemList([...itemList]);
  };

  // 할일 삭제
  const deleteItem = (_id) => {
    // 상태 변경
    const newItemList = itemList.filter((item) => item._id !== _id);
    setItemList(newItemList);
  };

  return (
    <div id="todo">
      <Header />
      <Todo itemList={itemList} addItem={addItem} toggleDone={toggleDone} deleteItem={deleteItem} />
      <Footer />
    </div>
  );
}

export default App;
