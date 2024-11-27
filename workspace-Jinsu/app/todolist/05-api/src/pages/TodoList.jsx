import useAxiosInstance from '@hooks/useAxiosInstance';
import TodoListItem from '@pages/TodoListItem';
import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import '../Pagination.css';
import Pagination from '@components/Pagination';

function TodoList() {
  const [data, setData] = useState();
  // 검색어에 접근하기 위한 변수 선언
  const searchRef = useRef();

  // useSearchParams : 주소창 쿼리 스트링 정보를 읽거나 설정할 때 사용하는 훅
  // 예) /list?keyword=환승&page=3 : 이 훅은 new URLSearchParams('keyword=환승&page=3')으로 반환해줌.
  // 검색결과는 주소창에 params로 나타나야 공유할 때 쉽게 공유한다.
  const [searchParams, setSearchParams] = useSearchParams();

  // params는 API 호출 시 서버로 전달되는 데이터를 설정하기 위한 객체다.
  // 저 아래의 handleSearch 함수가 호출되면 setSearchParams를 통해 URL의 쿼리 스트링이 업데이트 된다.
  // 업데이트된 쿼리 스트링을 객체의 멤버로 받아온다.
  const params = {
    // searchParams.get('keyword')는 현재 URL의 쿼리스트링에서 keyword의 값을 가져온다.
    keyword: searchParams.get('keyword') || '',
    // searchParams.get('keyword')는 현재 URL의 쿼리스트링에서 page의 값을 가져온다.
    page: searchParams.get('page') || 1,
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

  // (1) 최초 마운트 이후에 fetchList 함수 호출 (2) searchParams(URL의 쿼리 스트링) 상태가 변경되면 다시 한 번 호출
  useEffect(() => {
    fetchList();
  }, [searchParams]);

  // 처음에 마운트될 때는 data === null이기 때문에 마운트된 이후에 useEffect가 호출되면 data가 DUMMY_DATA로 채워진다.
  // 옵셔널 체이닝 연산자를 이용해 data === null일 때도 에러가 나지 않도록 했다.
  const itemList = data?.items.map((item) => (
    <TodoListItem key={item._id} item={item} handleDelete={handleDelete} />
  ));

  // 검색 기능 (실시간으로 목록이 렌더링되는 건 불필요한 렌더링이라 useRef 사용)
  const handleSearch = (e) => {
    e.preventDefault();
    // keyword만 쿼리 스트링에 업데이트하고 page 정보는 업데이트하지 않음. 그래서 위에 있는 params객체에서 page의 기본값인 1이 적용됨
    // setSearchParams를 통해 쿼리 스트링을 업데이트하지 않고, params 객체를 직접 수정하는 로직을 짜면, 실제로 데이터는 원하는대로 받아올 수 있을지 모르지만, 쿼리스트링이 업데이트 되지 않는다.
    // 쿼리스트링을 업데이트 하는 이유는 (1) 사용자가 현재 보고 있는 데이터를 표현하고, (2) 페이지를 공유하거나 북마크할 때 필요한 정보를 포함하기 위함임.
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
        {data && <p>검색 결과 : 총 {data.pagination.total}개</p>}
        <ul className='todolist'>{itemList}</ul>
      </div>

      {/* 조건부 렌더링 */}
      {data && (
        <Pagination totalPages={data.pagination.totalPages} currentPage={data?.pagination.page} />
      )}
    </div>
  );
}

export default TodoList;
