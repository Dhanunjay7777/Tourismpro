import React, { Component } from 'react';
import './todo.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            newTodoText: ''
        };
    }

    handleInputChange = (event) => {
        this.setState({ newTodoText: event.target.value });
    };

    handleAddTodo = () => {
        const { todos, newTodoText } = this.state;
        if (newTodoText.trim() !== '') {
            const newTodo = {
                id: todos.length + 1,
                text: newTodoText.trim(),
                completed: false
            };
            this.setState({
                todos: [...todos, newTodo],
                newTodoText: ''
            });
        }
    };

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.handleAddTodo();
        }
    };

    handleDeleteTodo = (id) => {
        const { todos } = this.state;
        const updatedTodos = todos.filter(todo => todo.id !== id);
        this.setState({ todos: updatedTodos });
    };

    handleToggleCompletion = (id) => {
        this.setState(prevState => ({
            todos: prevState.todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        }));
    };

    render() {
        const { todos, newTodoText } = this.state;

        return (
            <div className="todocontainer">
                <h1>Todo List</h1>
                <div>
                    <input
                        type="text"
                        value={newTodoText}
                        onChange={this.handleInputChange}
                        onKeyPress={this.handleKeyPress}
                        placeholder="Enter new todo"
                        className="todoinput"
                    />
                    <button onClick={this.handleAddTodo} className="todobutton">Add Todo</button>
                </div>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => this.handleToggleCompletion(todo.id)}
                                className="todocheckbox"
                            />
                            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                            <button1
                                onClick={() => this.handleDeleteTodo(todo.id)}
                                style={{ cursor: 'pointer', marginLeft: '10px' }}
                            >
                                Delete
                            </button1>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default TodoList;
