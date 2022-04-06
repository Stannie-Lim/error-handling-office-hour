const Sequelize = require('sequelize');
const conn = require('./conn');

const Todo = conn.define('todo', {
  taskName: {
    type: Sequelize.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  }
});

module.exports = Todo;
