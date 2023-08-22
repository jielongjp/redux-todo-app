import React from 'react';
import AddTodoBar from '../molecules/AddTodoBar';
import TodoFooter from '../molecules/TodoFooter';
import TodoList from '../molecules/TodoList';

function TodoMain() {
  return (
    <>
      <section className="medium-container">
        <h2>Todos</h2>
        <div className="todoapp">
          <AddTodoBar />
          <TodoList />
          <TodoFooter />
        </div>
      </section>
    </>
  );
}

export default TodoMain;
