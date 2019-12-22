import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './components/pages/About';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import uuid from 'uuid';
import axios from 'axios';

class App extends Component {
  state = {
    todos: []
  };
  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then(res => this.setState({ todos: res.data }));
  }
  markComplete = id => {
    console.log(id);
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    });
  };
  delTodo = id => {
    console.log('delete');
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res =>
      this.setState({
        todos: [...this.state.todos.filter(todo => todo.id !== id)]
      })
    );
  };
  addTodo = title => {
    console.log(title);

    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false
      })
      .then(res => this.setState({ todos: [...this.state.todos, res.data] }));
  };
  render() {
    console.log(this.state.todos);
    return (
      <Router>
        <Header />
        <Route
          path="/"
          exact
          render={props => (
            <React.Fragment>
              <AddTodo AddTodo={this.AddTodo} />
              <Todos
                todos={this.state.todos}
                markComplete={this.markComplete}
                delTodo={this.delTodo}
              />
            </React.Fragment>
          )}
        />
        <Route path="/about" component={About} />
      </Router>
    );
  }
}

export default App;
