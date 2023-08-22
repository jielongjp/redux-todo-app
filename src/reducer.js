import { combineReducers } from 'redux';

import filterReducer from './reducers/FilterReducer';
import todoReducer from './reducers/TodoReducer';

const rootReducer = combineReducers({
  todos: todoReducer,
  filters: filterReducer,
});

export default rootReducer;
