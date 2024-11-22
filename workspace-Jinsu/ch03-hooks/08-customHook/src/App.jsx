import { useEffect, useState } from 'react';

const API_SERVER = 'https://todo-api.fesp.shop/api';

function App() {
  // 서버에서 넘어온 data를 상태로 관리
  const [data, setData] = useState();

  // Todo API 서버에 ajax 요청을 보냄.
  const fetchTodo = async (fetchParams) => {
    try {
      const res = await fetch(API_SERVER + fetchParams.url);
      const jsonData = await res.json();

      // ok == 1 == true
      if (jsonData.ok) {
        // items 배열을 data에 담아줌
        setData(jsonData.items);
      } else {
        throw new Error(jsonData.error.message);
      }
    } catch (err) {
      // 에러 처리
      console.error(err);
    }
  };

  // 리액트 컴포넌트를 순수함수로 만들기 위해 서버통신 비동기 함수 호출은 useEffect 안에 작성.
  // 목록조회는 최초에 한 번만 실행하면 됨. deps 빈배열.
  useEffect(() => {
    const fetchParams = { url: '/todolist' };
    fetchTodo(fetchParams);
  }, []);

  return (
    <>
      <h1>08 Custom Hook - 커스텀 훅 없이 fetch API 사용</h1>
      <h2>할일 목록</h2>
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
