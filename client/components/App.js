import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Todos from './Todos';
import CreateTodo from './CreateTodo';
import EditTodo from './EditTodo';
import User from './User';
import { connect } from 'react-redux';
import { fetchTodos, fetchUsers } from '../store';

class App extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <Router>
        <div id='main'>
          <h1>
            <Link to='/'>Todos ({this.props.todos.length})</Link>
          </h1>
          <Link to='/todos/create'>Create A New Todo</Link>
          <Switch>
            <Route exact path='/' component={Todos} />
            <Route path='/todos/create' component={CreateTodo} />
            <Route path='/todos/:id' component={EditTodo} />
            <Route path='/users/:id' component={User} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ todos }) => ({
  todos
});

const mapDispatchToProps = (dispatch) => ({
  load: () => {
    dispatch(fetchTodos())
    dispatch(fetchUsers())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
