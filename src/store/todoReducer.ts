import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

// Create a slice
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // Add a new Todo
    addTodo: (state, action: PayloadAction<{ title: string; completed: boolean }>) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: action.payload.title,
        completed: action.payload.completed,
      };
      state.todos.push(newTodo); // Add the new Todo to the state
    },
    // Delete a Todo
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id); // Remove the Todo with the given ID
    },
  },
});

// Export the actions to be used in components
export const { addTodo, deleteTodo } = todoSlice.actions;

// Export the reducer to be used in the store
export default todoSlice.reducer;
