// index.js
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let todos = [];
let idCounter = 1;

// Create a new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = { id: idCounter++, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Update a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  const todo = todos.find(t => t.id === parseInt(id));
  if (!todo) return res.status(404).json({ message: "Todo not found" });

  todo.text = text !== undefined ? text : todo.text;
  todo.completed = completed !== undefined ? completed : todo.completed;

  res.json(todo);
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  todos = todos.filter(t => t.id !== parseInt(id));
  res.status(204).send();
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
