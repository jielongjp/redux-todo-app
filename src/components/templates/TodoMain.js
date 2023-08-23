import React from 'react';
import AddTodoBar from '../organisms/AddTodoBar';
import TodoFooter from '../organisms/TodoFooter';
import TodoList from '../organisms/TodoList';

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
