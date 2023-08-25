import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  statusFilterChanged,
  colorFilterChanged,
} from '../../reducers/FilterReducer';
import {
  allTodosCompleted,
  completedTodosCleared,
} from '../../reducers/TodoReducer';
import { RemainingTodos } from '../molecules/TodoFooter/RemainingTodos';
import { StatusFilter } from '../molecules/TodoFooter/StatusFilter';
import { ColorFilters } from '../molecules/TodoFooter/ColorFilters';

const TodoFooter = () => {
  const todosRemaining = useSelector((state) => {
    const uncompletedTodos = state.todos.filter((todo) => !todo.completed);
    return uncompletedTodos.length;
  });

  const { status, colors } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  const onMarkCompletedClicked = () => dispatch(allTodosCompleted());
  const onClearCompletedClicked = () => dispatch(completedTodosCleared());

  const onColorChange = (color, changeType) => {
    dispatch(colorFilterChanged(color, changeType));
  };
  const onStatusChange = (status) => {
    dispatch(statusFilterChanged(status));
  };

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={onMarkCompletedClicked}>
          Mark All Completed
        </button>
        <button className="button" onClick={onClearCompletedClicked}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  );
};

export default TodoFooter;
