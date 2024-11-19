import TodoInput from '@pages/TodoInput';
import TodoList from '@pages/TodoList';

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

export default Todo;
