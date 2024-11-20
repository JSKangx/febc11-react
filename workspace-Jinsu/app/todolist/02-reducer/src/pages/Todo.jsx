import TodoInput from '@pages/TodoInput';
import TodoList from '@pages/TodoList';
import PropTypes from 'prop-types';

function Todo({ addItem, itemList, deleteItem, toggleDone }) {
  return (
    <div id='main'>
      <div id='container'>
        <ul>
          <li>
            <h2>쇼핑 목록</h2>
            <TodoInput addItem={addItem} />
            <TodoList itemList={itemList} deleteItem={deleteItem} toggleDone={toggleDone} />
          </li>
        </ul>
      </div>
    </div>
  );
}

Todo.propTypes = {
  addItem: PropTypes.func.isRequired,
  itemList: PropTypes.array.isRequired,
  deleteItem: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
};

export default Todo;
