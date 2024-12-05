import axios from 'axios';
import { useEffect, useState } from 'react';

// 게시글 1건 조회 API 호출 함수
function fetchPost() {
  return axios.get(`https://11.fesp.shop/posts/1?delay=3000`, {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 게시글 상세 조회 페이지
function FetchOnRender() {
  // 데이터를 저장할 상태
  const [data, setData] = useState();

  useEffect(() => {
    // fetchPost를 컴포넌트 외부에 작성하고, Promise를 리턴하게 하고,
    // .then을 써서 res를 활용했다.
    fetchPost().then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) {
    return <div>게시물 로딩중...</div>;
  }

  return (
    <>
      <h4>{data.item.title}</h4>
      <Replies />
    </>
  );
}

// 댓글 목록 조회 API 호출
function fetchReplies() {
  return axios.get(`https://11.fesp.shop/posts/1/replies?delay=2000`, {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 댓글 목록 페이지
function Replies() {
  // 데이터를 저장할 상태
  const [data, setData] = useState();

  useEffect(() => {
    // fetchPost를 컴포넌트 외부에 작성하고, Promise를 리턴하게 하고,
    // .then을 써서 res를 활용했다.
    fetchReplies().then((res) => {
      setData(res.data);
    });
  }, []);

  if (!data) {
    return <div>댓글 로딩중...</div>;
  }

  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchOnRender;
