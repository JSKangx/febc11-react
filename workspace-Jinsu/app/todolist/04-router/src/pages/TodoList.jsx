import TodoListItem from '@pages/TodoListItem';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DUMMY_DATA = {
  items: [
    {
      _id: 1,
      title: '잠자기',
    },
    {
      _id: 2,
      title: '자바스크립트 복습',
      done: true,
    },
  ],
};

function TodoList() {
  const [data, setData] = useState();

  // 마운트 이후에 useEffect 호출하여 data를 DUMMY_DATA로 채워줌.
  useEffect(() => {
    setData(DUMMY_DATA);
  }, []);

  // 삭제 작업
  const handleDelete = (_targetId) => {
    // 서버에 변경을 발생시키는 것이기 때문에 사용자에게 결과를 정확히 고지해줘야 한다.
    try {
      // API 서버에 삭제 요청 했다고 치고
      alert('할일이 삭제되었습니다.');

      // API 서버에서 변경된 목록을 다시 조회해 오기
    } catch (err) {
      console.error(err);
      alert('할일 삭제에 실패했습니다.');
    }
  };

  // 처음에 마운트될 때는 data === null이기 때문에 마운트된 이후에 useEffect가 호출되면 data가 DUMMY_DATA로 채워진다.
  // data?. : 옵셔널 체이닝 연산자로 조건부로 렌더링되는 덕분에 data가 undefined일 때도 오류 없이 동작한다.
  const itemList = data?.items.map((item) => (
    <TodoListItem key={item._id} item={item} handleDelete={handleDelete} />
  ));

  return (
    <div id='main'>
      <h2>할일 목록</h2>
      <div className='todo'>
        <Link to='/list/add'>추가</Link>
        <br />
        <form className='search'>
          <input type='text' autoFocus />
          <button type='submit'>검색</button>
        </form>
        <ul className='todolist'>{itemList}</ul>
      </div>
    </div>
  );
}

export default TodoList;
