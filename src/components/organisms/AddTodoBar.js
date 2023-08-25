import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveNewTodo } from '../../reducers/TodoReducer';

const AddTodoBar = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => setText(e.target.value);

  const handleKeyDown = (e) => {
    console.log(e.target.value);
    const trimmedText = e.target.value.trim();
    console.log(trimmedText);
    if (e.key === 'Enter' && trimmedText) {
      dispatch(saveNewTodo(trimmedText));
      setText('');
    }
  };

  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </header>
  );
};

export default AddTodoBar;
