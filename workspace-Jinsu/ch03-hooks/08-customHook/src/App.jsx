import { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';

const API_SERVER = 'https://todo-api.fesp.shop/api';

function App() {
  // 서버에서 넘어온 data를 상태로 관리
  const [data, setData] = useState(null);
  // error를 state로 관리하면 에러 발생시 상태 업데이트 > 화면 리렌더링 > 사용자에게 에러 메시지 보여줌.
  const [error, setError] = useState(null);
  // 로딩 중 화면을 표시해주기 위해 상태로 관리.
  // 처음엔 로딩중이 아니다. 서버에 요청을 보내야 true가 된다.
  const [isLoading, setIsLoading] = useState(false);

  // Todo API 서버에 ajax 요청을 보냄.
  const fetchTodo = async (fetchParams) => {
    try {
      setIsLoading(true);
      const res = await fetch(API_SERVER + fetchParams.url);
      const jsonData = await res.json();

      // ok == 1 == true
      if (jsonData.ok) {
        // items 배열을 data에 담아줌
        setData(jsonData.items);
        setError(null);
      } else {
        // 서버 통신이 됐지만 잘못된 요청일 때의 에러
        throw new Error(jsonData.error.message);
      }
    } catch (err) {
      // 서버 통신이 아예 안 됐을 때의 에러
      console.error(err);
      setError({
        message: '일시적인 문제로 인해 작업 처리에 실패했습니다. 잠시 후 다시 시도해주세요.',
      });
      setData(null);
    } finally {
      // try, catch 블럭 중 어떤 것이 완료되든 무조건 실행되는 코드. 성공이든 실패든 로딩은 끝난 거니까.
      // finally를 안 써도 기능적으로는 똑같지만, 직관적으로 코드를 알아보게 하기 위해 같이 묶어준다.
      setIsLoading(false);
    }
  };

  // 리액트 컴포넌트를 순수함수로 만들기 위해 서버통신 비동기 함수 호출은 useEffect 안에 작성.
  // 목록조회는 최초에 한 번만 실행하면 됨. deps 빈배열.
  useEffect(() => {
    const fetchParams = { url: '/todolist?delay=3000' };
    fetchTodo(fetchParams);
  }, []);

  return (
    <>
      <h1>08 Custom Hook - 커스텀 훅 없이 fetch API 사용</h1>
      <h2>할일 목록</h2>
      {isLoading && <RingLoader color='#3da4d3' speedMultiplier={1} />}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
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
