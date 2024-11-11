import kang from '../../../kang.js';

// 입력창 구성
function TodoInput({ handleAdd, handleAddKeyup }) {
  return kang.createElement(
    'div',
    { class: 'todoinput' },
    kang.createElement('input', { type: 'text', autofocus: '', onkeyup: (event) => handleAddKeyup(event) }),
    kang.createElement('button', { type: 'button', onclick: handleAdd }, '추가'),
  );
}

export default TodoInput;
