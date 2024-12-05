import axios from 'axios';
import { useEffect, useState } from 'react';

// 게시글 & 댓글 목록 조회를 동시에
function fetchData() {
  return Promise.all([fetchPost(), fetchReplies()]).then(([post, replies]) => ({
    post: post.data,
    replies: replies.data,
  }));
}

// 컴포넌트 밖에서 fetchData 호출.
// 부모 컴포넌트에 import 될 때(렌더링 전) 이 함수는 호출된다.
const promise = fetchData();

// 게시글 1건 조회 API 호출 함수
function fetchPost() {
  return axios.get(`https://11.fesp.shop/posts/1?delay=3000`, {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 게시글 상세 조회 페이지
function FetchThenRender() {
  // 데이터를 저장할 상태
  const [post, setPost] = useState();
  const [replies, setReplies] = useState();

  useEffect(() => {
    // fetchPost를 컴포넌트 외부에 작성하고, Promise를 리턴하게 하고,
    // .then을 써서 res를 활용했다.
    promise.then((res) => {
      setPost(res.post);
      setReplies(res.replies);
    });
  }, []);

  if (!post) {
    return <div>게시물 로딩중...</div>;
  }

  return (
    <>
      <h4>{post.item.title}</h4>
      {/* 자식은 자신이 필요한 데이터를 직접 가져오는 게 아니고, 부모가 가져온 데이터를 props로 전달받는다. 부모에게 의존하게 되기에 다른 데서 사용 못한다.*/}
      <Replies replies={replies} />
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
function Replies({ replies }) {
  if (!replies) {
    return <div>댓글 로딩중...</div>;
  }

  const list = replies.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchThenRender;
