import axios from 'axios';

// action type constants
const CREATE_TODO = 'CREATE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const SET_TODOS = 'SET_TODOS';

// action creators
const _createTodo = (todo) => {
  return {
    type: CREATE_TODO,
    todo
  };
};

const _updateTodo = (todo) => {
  return {
    type: UPDATE_TODO,
    todo
  };
};

const _deleteTodo = (todo) => {
  return {
    type: DELETE_TODO,
    todo
  };
};

const _setTodos = (todos) => {
  return {
    type: SET_TODOS,
    todos
  };
};

// THUNK CREATORS

export const createTodo = (todo, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/todos', todo);
    dispatch(_createTodo(created));
    if (history) history.push('/');
  };
};

export const updateTodo = (todo, history) => {
  return async (dispatch) => {
    const response = await axios.put(`/api/todos/${todo.id}`, todo);
    dispatch(_updateTodo(response.data));
    console.log(response.data);
    history.push('/');
  };
};

export const deleteTodo = (id, history) => {
  return async (dispatch) => {
    const {data: todo} = await axios.delete(`/api/todos/${id}`);
    dispatch(_deleteTodo(todo));
    history.push('/');
  };
};

export const fetchTodos = () => {
  return async (dispatch) => {
    const { data: todos } = await axios.get('/api/todos');
    dispatch(_setTodos(todos));
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case SET_TODOS:
      return action.todos;
    case UPDATE_TODO:
      return state.map((todo) =>
        todo.id === action.todo.id ? action.todo : todo
      );
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.todo.id);
    case CREATE_TODO:
      return [...state, action.todo];
    default:
      return state;
  }
};
