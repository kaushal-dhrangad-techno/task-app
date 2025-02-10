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
const initialState: TodoState = {
  todos: [],
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
    },
    // Delete a Todo
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id); // Remove the Todo with the given ID
    },
    toggleTodo: (state, action) => {
     const todo = state.todos.find((todo) => {
        if (todo) {
          todo.completed = !todo.completed;
        }
      });
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;

export default todoSlice.reducer;
