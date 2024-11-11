import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Todo from './pages/Todo';

function App() {
  // 샘플 목록
  const [itemList, setItemList] = useState([
    { _id: 1, title: '두부', done: true },
    { _id: 2, title: '계란', done: false },
    { _id: 3, title: '라면', done: true },
  ]);

  const addItem = (item) => {
    // 새로운 배열을 만들어 push해 주고, 새로운 배열을 set해주면 된다.
    const newItemList = [...itemList, item];
    setItemList(newItemList);
  };

  return (
    <div id="todo">
      <Header />
      <Todo itemList={itemList} addItem={addItem} />
      <Footer />
    </div>
  );
}

export default App;
