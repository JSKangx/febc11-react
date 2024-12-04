import useAxiosInstance from '@hooks/useAxiosInstance';
import TodoListItem from '@pages/TodoListItem';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';

import '../Pagination.css';
import Pagination from '@components/Pagination';

function TodoList() {
  // const [data, setData] = useState();
  const searchRef = useRef();

  const [searchParams, setSearchParams] = useSearchParams();

  const params = {
    keyword: searchParams.get('keyword') || '',
    page: searchParams.get('page') || 1,
    limit: 10,
  };

  const axios = useAxiosInstance();

  const { data, refetch } = useQuery({
    // 쿼리 키 자체가 useEffect의 deps와 같은 역할을 한다.
    // 이게 바뀔 때 서버 통신을 다시 한다. 그래서 params까지 쿼리 키로 정해줘야 페이지네이션이 된다.
    queryKey: ['todolist', params],
    queryFn: () => axios.get('/todolist', { params }),
    select: (res) => res.data,
    staleTime: 1000 * 60, // 1분 동안 캐시유지.
    gcTime: 1000 * 60 * 5, // 5분 뒤 캐시 제거 (기본이 5분)
  });

  console.log(data);

  // 삭제 작업
  const handleDelete = async (_targetId) => {
    // 서버에 변경을 발생시키는 것이기 때문에 사용자에게 결과를 정확히 고지해줘야 한다.
    try {
      // API 서버에 삭제 요청
      const res = await axios.delete(`/todolist/${_targetId}`);
      console.log(res);
      alert('할일이 삭제되었습니다.');
      // API 서버에서 변경된 목록을 다시 조회해 오기
      refetch();
    } catch (err) {
      console.error(err);
      alert('할일 삭제에 실패했습니다.');
    }
  };

  const itemList = data?.items.map((item) => (
    <TodoListItem key={item._id} item={item} handleDelete={handleDelete} />
  ));

  const handleSearch = (e) => {
    e.preventDefault();

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
