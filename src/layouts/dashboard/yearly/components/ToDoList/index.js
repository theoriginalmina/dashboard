//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\vision-ui-dashboard-react-main\src\layouts\dashboard\components\ToDoList\index.js

import React, { useState } from "react";
import { Button, Card, CardContent, TextField, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function TodoComponent() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const handleAddTodo = () => {
    if (input) {
      setTodos([...todos, { id: Date.now(), text: input, edit: false }]);
      setInput("");
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEditTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, edit: !todo.edit } : todo
      )
    );
  };

  const handleUpdateTodo = (id, event) => {
    if (event.key === "Enter") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: event.target.value, edit: false } : todo
        )
      );
    }
  };

  return (
    <div>
      <TextField 
        label="New Task" 
        variant="outlined" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <Button variant="contained" color="primary" onClick={handleAddTodo}>
        Add Task
      </Button>
      {todos.map((todo) => (
        <Card key={todo.id}>
          <CardContent>
            {todo.edit ? (
              <TextField 
                autoFocus 
                value={todo.text} 
                onKeyPress={(e) => handleUpdateTodo(todo.id, e)} 
              />
            ) : (
              <Typography>{todo.text}</Typography>
            )}
            <IconButton onClick={() => handleDeleteTodo(todo.id)}>
              <DeleteIcon />
            </IconButton>
            <IconButton onClick={() => handleEditTodo(todo.id)}>
              <EditIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


export default TodoComponent;
