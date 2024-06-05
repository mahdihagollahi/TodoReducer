import React, { useState } from "react";

function TodoListItems({ todo, deleteTodo, markTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleEdit = (event) => {
    if (event.key === "Enter") {
      editTodo(todo.id, newTitle);
      setIsEditing(false);
    }
  };

  return (
    <li className="relative flex items-center justify-between px-2 py-6 border-b">
      {isEditing ? (
        <div className="w-full flex items-center justify-between">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-xs w-full max-w-xs"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleEdit}
          />

          <button
            className="btn btn-circle btn-outline"
            onClick={() => setIsEditing(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center ">
          <div>
            <input
              type="checkbox"
              className="checkbox checkbox-xs "
              checked={todo.status}
              onChange={() => markTodo(todo.id)}
            />
            <p
              className={`inline-block mb-1 ml-2 text-gray-600 ${
                todo.status ? "line-through" : ""
              }`}
            >
              {todo.title}
            </p>
          </div>
          <button
            type="button"
            className="absolute right-0 flex items-center space-x-1"
          >
            <button
              className="btn btn-circle btn-outline"
              onClick={() => setIsEditing(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
            </button>

            <button
              className="btn btn-circle btn-outline"
              onClick={() => deleteTodo(todo.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </button>
        </div>
      )}
    </li>
  );
}

export default TodoListItems;
