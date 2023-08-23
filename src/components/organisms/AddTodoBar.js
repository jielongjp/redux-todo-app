import React, { useState } from 'react';

const AddTodoBar = () => {
  const [text, setText] = useState('');

  const handleChange = (e) => setText(e.target.value);
  return (
    <header className="header">
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={text}
        onChange={handleChange}
      />
    </header>
  );
};

export default AddTodoBar;
