// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    await axios.post(API_URL, { text: newTodo });
    setNewTodo('');
    fetchTodos();
  };

  const updateTodo = async (id, updatedTodo) => {
    await axios.put(`${API_URL}/${id}`, updatedTodo);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Todo List</h2>
      <input
        type="text"
        value={newTodo}
        placeholder="Enter a task"
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo.id} style={{ margin: '10px 0' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                updateTodo(todo.id, { ...todo, completed: !todo.completed })
              }
            />
            <span style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              marginLeft: '8px'
            }}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: '10px' }}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
