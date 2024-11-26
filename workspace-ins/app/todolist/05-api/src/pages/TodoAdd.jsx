import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function TodoAdd() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // handleSubmit에서 검증을 통과할 경우 호출됨
  const onSubmit = (item) => {
    console.log('서버에 전송', item);
  };

  return (
    <div id="main">
      <h2>할일 추가</h2>
      <div className="todo">
        <form onSubmit={ handleSubmit(onSubmit) }>
          <label htmlFor="title">제목 :</label>
          <input 
            type="text" 
            id="title" 
            autoFocus
            { ...register('title', {
              required: '제목을 입력하세요.',
            }) }
          />
          <div className="input-error">{ errors.title?.message }</div>
          <br/>
          <label htmlFor="content">내용 :</label>
          <textarea 
            id="content" 
            cols="23" rows="5"
            { ...register('content', {
              required: '내용을 입력하세요.',
            }) }
          />
          <div className="input-error">{ errors.content?.message }</div>
          <br/>
          <button type="submit">추가</button>
          <Link to="/list">취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoAdd;