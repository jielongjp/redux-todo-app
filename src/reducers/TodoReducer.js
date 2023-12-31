import { client } from '../api/client';
import { createSelector } from 'reselect';
import { StatusFilters } from './FilterReducer';

const initialState = [];

// function nextTodoId(todos) {
//   const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1);
//   return maxId + 1;
// }

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case 'todos/todoAdded': {
      return [...state, action.payload];
    }
    case 'todos/todoToggled': {
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    }
    case 'todos/colorSelected': {
      const { color, todoId } = action.payload;
      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          color,
        };
      });
    }
    case 'todos/todoDeleted': {
      return state.filter((todo) => todo.id !== action.payload);
    }
    case 'todos/allCompleted': {
      return state.map((todo) => {
        return { ...todo, completed: true };
      });
    }
    case 'todos/completedCleared': {
      return state.filter((todo) => !todo.completed);
    }
    case 'todos/todosLoaded': {
      return action.payload;
    }
    case 'todos/todosLoading': {
      return {
        ...state,
        status: 'loading',
      };
    }
    default:
      return state;
  }
}

export const todoAdded = (todo) => ({ type: 'todos/todoAdded', payload: todo });
export const todoToggled = (todoId) => ({
  type: 'todos/todoToggled',
  payload: todoId,
});

export const todoColorSelected = (todoId, color) => ({
  type: 'todos/colorSelected',
  payload: { todoId, color },
});

export const todoDeleted = (todoId) => ({
  type: 'todos/todoDeleted',
  payload: todoId,
});

export const allTodosCompleted = () => ({ type: 'todos/allCompleted' });

export const completedTodosCleared = () => ({ type: 'todos/completedCleared' });

export const todosLoading = () => ({ type: 'todos/todosLoading' });

export const todosLoaded = (todos) => ({
  type: 'todos/todosLoaded',
  payload: todos,
});

export const selectTodos = (state) => state.todos.entities;

export const selectTodoById = (state, todoId) => {
  return selectTodos(state).find((todo) => todo.id === todoId);
};

export const selectTodoIds = createSelector(selectTodos, (todos) =>
  todos.map((todo) => todo.id)
);

export const selectFilteredTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const { status, colors } = filters;
    const showAllCompletions = status === StatusFilters.All;
    if (showAllCompletions && colors.length === 0) {
      return todos;
    }

    const completedStatus = status === StatusFilters.Completed;
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompletions || todo.completed === completedStatus;
      const colorMatches = colors.length === 0 || colors.includes(todo.color);
      return statusMatches && colorMatches;
    });
  }
);

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
);

export const fetchTodos = () => async (dispatch) => {
  dispatch(todosLoading());
  const response = await client.get('/fakeApi/todos');
  dispatch(todosLoaded(response.todos));
};

export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const initialTodo = { text };
    const response = await client.post('/fakeApi/todos', { todo: initialTodo });
    dispatch(todoAdded(response.todo));
  };
}
