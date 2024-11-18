import { useState } from 'react';

function TodoInput({ addItem }) {
  /*
    vanilla JS에서는 입력할 때마다 input을 브라우저가 입력해줬는데,
    React에서는 title 변수를 input.value에 넣어주고,
    input에 change 이벤트를 추가 - 추가될 때마다 title 변수를 수정 - 변경된 title이 useState에 의해 input에 입력됨.
    -> 이렇게 하면 dom api로 title을 꺼내오지 않아도 된다.
  */
  const [title, setTitle] = useState('');
  const [nextId, setNextId] = useState('4');

  const handleAdd = () => {
    if (title.trim() !== '') {
      const item = { _id: nextId, title, done: false };
      addItem(item);

      setNextId(parseInt(nextId) + 1);
      setTitle('');
    }
  };

  const handleKeyUp = event => {
    if (event.key === 'Enter') handleAdd();
  };

  return (
    <div className='todoinput'>
      <input
        type='text'
        autoFocus
        onKeyUp={event => handleKeyUp(event)}
        value={title}
        onChange={event => setTitle(event.target.value)}
      />
      <button type='button' onClick={handleAdd}>
        추가
      </button>
    </div>
  );
}

export default TodoInput;
