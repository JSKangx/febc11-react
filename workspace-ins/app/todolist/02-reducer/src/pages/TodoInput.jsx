import PropTypes from "prop-types";
import { useState } from "react";

function TodoInput({ addItem }){
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if(title.trim() !== ''){
      addItem(title);
      setTitle('');
    }
  };
  
  const handleKeyUp = (event) => {
    if(event.key === 'Enter') handleAdd();
  };

  return (
    <div className="todoinput">
      <input type="text" autoFocus onKeyUp={ handleKeyUp } value={ title } onChange={ event => setTitle(event.target.value) } />
      <button type="button" onClick={ handleAdd }>추가</button>
    </div>
  );
}

TodoInput.propTypes = {
  addItem: PropTypes.func.isRequired
};

export default TodoInput;