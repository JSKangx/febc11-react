import useFetch from '@hooks/useFetch';
import useAxios from '@hooks/useAxios';
import { RingLoader } from 'react-spinners';
import axios from 'axios';

function App() {
  // const { data, error, isLoading } = useFetch({ url: '/todolist?delay=2000' });
  const { data, error, isLoading } = useAxios({ url: '/todolist?delay=500' });

  return (
    <>
      <h1>09 Custom Hook - useFetch, useAxios 커스텀 훅 사용</h1>
      <h2>할일 목록</h2>
      {isLoading && <RingLoader color='#3da4d3' speedMultiplier={1} />}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
      {data && (
        <ul>
          {data.items.map((item) => (
            <li key={item._id}>{item.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default App;
