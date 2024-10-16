import React, { useState } from 'react';
const TodoApp = () => {
  const [todos, setTodos] = useState([]); 
  const [inputValue, setInputValue] = useState(''); 
  const [editIndex, setEditIndex] = useState(null); 

  const addTodo = () => {
    if (inputValue) {
      const newTodo = { id: Date.now(), text: inputValue };
      setTodos([...todos, newTodo]); 
      setInputValue(''); 
    }
  };

  const displayTodos = () => {
    return todos.map((todo, index) => (
      <li key={todo.id} className="todo-item">
        {todo.text}
        <button className="circle-btn edit-btn" onClick={() => editTodo(index)} title="Edit">
          ✏️
        </button>
        <button className="circle-btn delete-btn" onClick={() => deleteTodo(todo.id)} title="Delete">
          🗑️
        </button>
      </li>
    ));
  };

  const editTodo = (index) => {
    setInputValue(todos[index].text); 
    setEditIndex(index); 
  };

  const saveTodo = () => {
    if (editIndex !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === editIndex ? { ...todo, text: inputValue } : todo
      );
      setTodos(updatedTodos);
      setInputValue(''); 
      setEditIndex(null); 
    } else {
      addTodo(); 
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id)); 
  };

  return (
    <div className="todo-app-container">
      <div className="todo-card">
        <h1>TODO LIST</h1>
        <input
          type="text"
          value={inputValue}
          placeholder="Add item..."
          onChange={(e) => setInputValue(e.target.value)}
          className="todo-input"
        />
        <button className="circle-btn add-btn" onClick={saveTodo}>
          {editIndex !== null ? '💾' : '➕'}
        </button>
        <ul className="todo-list">
          {displayTodos()}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;
