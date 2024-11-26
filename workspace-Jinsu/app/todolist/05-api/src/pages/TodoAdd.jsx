import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

function TodoAdd() {
  // useForm으로 상태 관리
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // react-hook-form의 handleSumbit을 통해 검증이 끝난 사용자 객체가 onSumbit의 인수로 넘어온다.
  const onSubmit = (item) => {
    console.log('서버에 전송', item);

    const xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://todo-api.fesp.shop/api/todolist');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = 'json';

    // 서버로부터 응답이 도착하면 호출되는 함수
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log(xhr.response);
        alert('할 일이 추가되었습니다.');
      } else {
        // 400 ~ 500번대 응답
        console.log('서버에서 에러 응답', xhr.status, xhr.response);
        alert('할 일 추가에 실패했습니다.');
      }
    };

    xhr.send(JSON.stringify(item));
  };

  return (
    <div id='main'>
      <h2>할일 추가</h2>
      <div className='todo'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor='title'>제목 :</label>
          <input
            type='text'
            id='title'
            autoFocus
            {...register('title', {
              required: '할일을 입력하세요.',
            })}
          />
          <div className='input-error'>{errors.title?.message}</div>
          <br />
          <label htmlFor='content'>내용 :</label>
          <textarea
            id='content'
            cols='23'
            rows='5'
            {...register('content', {
              required: '내용을 입력하세요.',
            })}
          />
          <div className='input-error'>{errors.content?.message}</div>
          <br />
          <button type='submit'>추가</button>
          <Link to='/list'>취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoAdd;
