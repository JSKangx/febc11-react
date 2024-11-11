import kang from '../../../kang.js';
import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';

// 할 일 구성
function Todo(props) {
  return kang.createElement(
    'div',
    { id: 'main' },
    kang.createElement(
      'div',
      { id: 'container' },
      kang.createElement(
        'ul',
        null,
        kang.createElement(
          'li',
          null,
          kang.createElement('h2', null, '쇼핑 목록'),
          TodoInput({
            handleAdd: props.handleAdd,
            handleAddKeyup: props.handleAddKeyup,
          }),
          TodoList({
            itemList: props.itemList,
            toggleDone: props.toggleDone,
            deleteItem: props.deleteItem,
          }),
        ),
      ),
    ),
  );
}

export default Todo;
