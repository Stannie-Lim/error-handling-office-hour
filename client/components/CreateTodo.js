import React, { Component } from 'react';
import { createTodo } from '../store/todos';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// if i pass in a userId to this component, it will automatically set userId as the userId in the state
class CreateTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      userId: this.props.userId || '',
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    try {
      await this.props.createTodo({ ...this.state });
    } catch (error) {
      this.setState({ error: error.response.data });
    }
  }

  render() {
    const { userId, taskName, error } = this.state;
    const { users, isInSingleView } = this.props;
    const { handleSubmit, handleChange } = this;

    return (
      <form id='todo-form' onSubmit={handleSubmit}>
        <label htmlFor='taskName'>Task Name:</label>
        <input name='taskName' onChange={handleChange} value={taskName} />
        {!isInSingleView && <select name='userId' onChange={handleChange} value={userId}>
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
        </select>}
        {error && <h1>{error}</h1>}
        <button type='submit'>Submit</button>
        <Link to='/'>Cancel</Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createTodo: (todo) => dispatch(createTodo(todo, history))
});

export default connect(state=> state, mapDispatchToProps)(CreateTodo);
