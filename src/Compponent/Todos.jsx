import React, { useReducer, useState } from 'react';
import TodoListItems from "./TodoListItems";
import { v4 as uuidv4 } from "uuid";

const ACTION = {
  ADD_TODO: 'add_todo',
  DELETE_TODO: 'delete_todo',
  MARK_TODO: 'mark_todo',
  EDIT_TODO: 'edit_todo'
}

function reducer(todos, action) {
  switch (action.type) {
    case ACTION.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTION.EDIT_TODO:
      return todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo
      );
    case ACTION.DELETE_TODO:
      return todos.filter(todo => todo.id !== action.payload.id);
    case ACTION.MARK_TODO:
      return todos.map(todo =>
        todo.id === action.payload.id ? { ...todo, status: !todo.status } : todo
      );
    default:
      return todos;
  }
}

const newTodo = (name) => {
  return { id: uuidv4(), title: name, status: false };
}

export default function App() {
  const [todos, dispatch] = useReducer(reducer, [
    { id: uuidv4(), title: "go to school", status: true },
    { id: uuidv4(), title: "go to gym", status: false }
  ]);
  const [name, setName] = useState('');

  const addNew = (event) => {
    event.preventDefault();
    dispatch({ type: ACTION.ADD_TODO, payload: { name } });
    setName("");
  }

  const deleteTodo = (id) => {
    dispatch({ type: ACTION.DELETE_TODO, payload: { id } });
  }

  const markTodo = (id) => {
    dispatch({ type: ACTION.MARK_TODO, payload: { id } });
  }

  const editTodo = (id, title) => {
    dispatch({ type: ACTION.EDIT_TODO, payload: { id, title } });
  }

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="w-full px-4 py-8 mx-auto shadow lg:w-1/3 bg-white" 
        style={{ backgroundColor: "var(--background)"}}>
          <div className="flex items-center mb-6">
            <h1 className="mr-3 text-4xl font-bold text-purple-600">TO DO APP</h1>
          </div>
          <div className="relative">
            <form onSubmit={addNew}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="What needs to be done today?"
                className="w-full px-2 py-3 border rounded outline-none border-grey-600"
              />
            </form>
          </div>
          <ul>
            {todos.map(todo => (
              <TodoListItems
                key={todo.id}
                todo={todo}
                deleteTodo={deleteTodo}
                markTodo={markTodo}
                editTodo={editTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
