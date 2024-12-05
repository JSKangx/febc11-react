import FetchThenRender from './02-FetchThenRender';
import FetchOnRender from './01-FetchOnRender';
import axios from 'axios';
import { useEffect, useState } from 'react';

// 게시글 목록 조회 API 호출
function fetchPostList() {
  return axios.get(`https://11.fesp.shop/posts?type=brunch&delay=4000`, {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 게시글 목록 조회하는 페이지
function PostList() {
  // 데이터를 저장할 상태
  const [data, setData] = useState();

  useEffect(() => {
    // fetchPost를 컴포넌트 외부에 작성하고, Promise를 리턴하게 하고,
    // .then을 써서 res를 활용했다.
    fetchPostList().then((res) => {
      setData(res.data);
    });
  }, []);

  // 마운트 시점에는 data === undefined 이기에 이게 렌더링됨.
  if (!data) {
    return <div>게시물 목록 로딩중...</div>;
  }

  return (
    <>
      <h2>총 게시물 : {data.item.length}건</h2>
      <hr />

      <h3>Fetch-on-render 방식</h3>
      <FetchOnRender />
      <hr />

      <h3>Fetch-then-render 방식</h3>
      <FetchThenRender />
      <hr />
    </>
  );
}

export default PostList;
