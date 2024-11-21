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
      console.log(jsonData);

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

  // 목록조회는 최초에 한 번만 실행하면 됨.
  useEffect(() => {
    const fetchParams = { url: '/todolist' };
    fetchTodo(fetchParams);
  }, []);

  return (
    <>
      <h1>08 Custom Hook - fetch API 사용</h1>
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
