import useAxiosInstance from '@hooks/useAxiosInstance';
import TodoListItem from '@pages/TodoListItem';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import '../Pagination.css';
import Pagination from '@components/Pagination';

// const DUMMY_DATA = {
//   items: [
//     {
//       _id: 1,
//       title: '잠자기',
//     },
//     {
//       _id: 2,
//       title: '자바스크립트 복습',
//       done: true,
//     },
//   ],
// };

function TodoList() {
  const [data, setData] = useState();
  const searchRef = useRef();

  // 주소창 쿼리 스트링 정보를 읽거나 설정할 때 사용하는 훅
  // 예) /list?keyword=환승&page=3 : 이 훅은 new URLSearchParams('keyword=환승&page=3')으로 반환해줌.
  // 검색결과는 주소창에 params로 나타나야 공유할 때 쉽게 공유한다.
  const [searchParams, setSearchParams] = useSearchParams();
  const params = {
    keyword: searchParams.get('keyword') || '', // 쿼리 스트링에서 keyword값 꺼내
    page: searchParams.get('page') || 1, // 쿼리 스트링에서 page값 꺼내
    limit: 15,
  };

  // API 서버에서 목록조회 (리액트 훅은 이벤트 리스너 안에서 사용 불가하기에, 삭제 이벤트 리스너 안에서는 일반 액시오스 객체 사용)
  // const { data } = useFetch({ url: '/todolist' });

  // 미리 만들어 놓은 커스텀 axios instance를 받아온다.
  const myAxios = useAxiosInstance();

  // 삭제 작업
  const handleDelete = async (_targetId) => {
    // 서버에 변경을 발생시키는 것이기 때문에 사용자에게 결과를 정확히 고지해줘야 한다.
    try {
      // API 서버에 삭제 요청
      const res = await myAxios.delete(`/todolist/${_targetId}`);
      console.log(res);
      alert('할일이 삭제되었습니다.');
      // API 서버에서 변경된 목록을 다시 조회해 오기
      fetchList();
    } catch (err) {
      console.error(err);
      alert('할일 삭제에 실패했습니다.');
    }
  };

  // 서버로부터 리스트를 조회해오는 함수 정의
  // (1) 최초 마운트 이후 (2) 데이터를 삭제할 때 호출됨
  async function fetchList() {
    // { params : params } 를 축약하여 { params }
    const res = await myAxios.get('/todolist', { params });
    // 리스트를 받아와서 data 상태를 업데이트한다.
    console.log(res.data);
    setData(res.data);
  }

  // 최초 마운트 이후에 fetchList 함수 호출
  useEffect(() => {
    fetchList();
  }, [searchParams]);

  // 처음에 마운트될 때는 data === null이기 때문에 마운트된 이후에 useEffect가 호출되면 data가 DUMMY_DATA로 채워진다.
  const itemList = data?.items.map((item) => (
    <TodoListItem key={item._id} item={item} handleDelete={handleDelete} />
  ));

  // 검색 기능 (실시간으로 목록이 렌더링되는 건 불필요한 렌더링이라 useRef 사용)
  const handleSearch = (e) => {
    e.preventDefault();
    // 새로운 searchParams 만들고 searchParams에 할당
    setSearchParams(new URLSearchParams(`keyword=${searchRef.current.value}`));
    searchRef.current.value = '';
  };

  return (
    <div id='main'>
      <h2>할일 목록</h2>
      <div className='todo'>
        <Link to='/list/add'>추가</Link>
        <br />
        <form onSubmit={handleSearch} className='search'>
          <input type='text' autoFocus defaultValue={params.keyword} ref={searchRef} />
          <button type='submit'>검색</button>
        </form>
        <p>검색 결과 : 총 {data?.pagination.total}개</p>
        <ul className='todolist'>{itemList}</ul>
      </div>

      {/* 조건부 렌더링 */}
      {data && (
        <Pagination totalPages={data?.pagination.totalPages} currentPage={data?.pagination.page} />
      )}
    </div>
  );
}

export default TodoList;
