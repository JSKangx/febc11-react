import kang from '../../../kang.js';
import TodoItem from './TodoItem.js';

// 할 일 목록 구성
function TodoList(props) {
  const list = props.itemList.map((item) =>
    TodoItem({
      item,
      toggleDone: props.toggleDone,
      deleteItem: props.deleteItem,
    }),
  );
  return kang.createElement('ul', { class: 'todolist' }, list);
}

export default TodoList;
