import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the Todo type
interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

// Define the state type
interface TodoState {
  todos: Todo[];
}

// Define the initial state

const loadTodosFromLocalstorage = () => {
  const savedTodos = localStorage.getItem("tasks");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const savedTodosFromLocalstorage = (todos: Todo[]) => {
  localStorage.setItem("tasks", JSON.stringify(todos));
};

const initialState: TodoState = {
  todos: loadTodosFromLocalstorage(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Add a new Todo
    addTodo: (
      state,
      action: PayloadAction<{ title: string; completed: boolean }>
    ) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: action.payload.title,
        completed: action.payload.completed,
      };
      state.todos.push(newTodo);
      savedTodosFromLocalstorage(state.todos)
    },
    // Delete a Todo
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id); // Remove the Todo with the given ID
      savedTodosFromLocalstorage(state.todos)
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      savedTodosFromLocalstorage(state.todos)
      // });
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
