import kang from '../../../kang.js';

// 할 일 아이템 하나
// 구조분해 할당을 통해 TodoList에서 넘어오는 { item }을 인수로 넣어줌.
function TodoItem({ item, toggleDone, deleteItem }) {
  return kang.createElement(
    'li',
    { 'data-no': item.no },
    kang.createElement('span', null, item.no),
    kang.createElement(
      'span',
      { onclick: () => toggleDone(item.no) },
      item.done ? kang.createElement('s', null, item.title) : item.title,
    ),
    kang.createElement('button', { onclick: () => deleteItem(item.no) }, '삭제'),
  );
}

export default TodoItem;
