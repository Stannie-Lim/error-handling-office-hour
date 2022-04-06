import React from 'react';
import { connect } from 'react-redux';

import CreateTodo from './CreateTodo';

const User = ({ user, todos }) => {
  if (!user) return '...loading';

  return (
    <>
      <h1>{user.name}</h1>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.taskName}</li>)}
      </ul>
      <CreateTodo userId={user.id} isInSingleView />
    </>
  );
};

/**
 * 
 * 1. get the id of the user that you want to show
 * 2. get all of the users from the store
 * 3. find the user that you want, based off the id that you have
 * 4. just display it
 */

const mapState = ({ users, todos }, { match: { params: { id }}}) => {
  const user = users.find(user => user.id === +id) || {};
  return {
    user, 
    todos: todos.filter(todo => todo.userId === user.id),
  }
};

export default connect(mapState)(User);