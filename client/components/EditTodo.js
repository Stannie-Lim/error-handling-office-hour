import React, { Component } from 'react';
import { deleteTodo, updateTodo } from '../store/todos';
import { connect } from 'react-redux';

class EditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: this.props.todo ? this.props.todo.taskName : '',
      userId: (this.props.todo && this.props.todo.userId) ? this.props.todo.userId : '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(!prevProps.todo && this.props.todo){
      this.setState({
        taskName: this.props.todo.taskName,
        userId: this.props.todo.userId || ''
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      await this.props.updateTodo({ ...this.props.todo, ...this.state });
    } catch (error) {
      this.setState({ error: error.response.data });
    }
  }

  render() {
    const { userId, taskName, error } = this.state;
    const { users } = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <form id='todo-form' onSubmit={handleSubmit}>
          <label htmlFor='taskName'>Task Name:</label>
          <input name='taskName' onChange={handleChange} value={taskName} />

          <label htmlFor='assignee'>Assign To:</label>
          <select name='userId' onChange={handleChange} value={userId}>
            <option value=''>-- nobody --</option>
            {
              users.map( user => {
                return (
                  <option value={ user.id } key={ user.id }>
                    { user.name }
                  </option>
                );
              })
            }
          </select>
          {error && <h1>{error}</h1>}
          <button type='submit'>Submit</button>
        </form>
        <form onSubmit={(ev) => ev.preventDefault()}>
          <button
            className='remove'
            onClick={() => this.props.deleteTodo(this.props.match.params.id)}
          >
            Delete
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ todos, users }, { match }) => { 
  const todo = todos.find(todo => todo.id === match.params.id*1);
  return {
    todo,
    users
  };
};

const mapDispatchToProps = (dispatch, { history }) => ({
  updateTodo: (todo) => dispatch(updateTodo(todo, history)),
  deleteTodo: (todo) => dispatch(deleteTodo(todo, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
