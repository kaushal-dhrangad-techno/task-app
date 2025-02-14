import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CategoryProps {
  title: string;
  emoji?: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  selectedDate?: Date;
  selectedTimeSlots: string[];
  category: CategoryProps[];
}

// Define the state type
interface TodoState {
  todos: Todo[];
  completedTodos: Todo[];
}

// Load tasks from local storage
const loadTodosFromLocalstorage = () => {
  const savedTodos = localStorage.getItem("tasks");
  const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
  return {
    todos: parsedTodos.filter((todo: Todo) => !todo.completed),
    completedTodos: parsedTodos.filter((todo: Todo) => todo.completed),
  };
};

// Save tasks to local storage
const savedTodosFromLocalstorage = (todos: Todo[], completedTodos: Todo[]) => {
  localStorage.setItem("tasks", JSON.stringify([...todos, ...completedTodos]));
};

const initialState: TodoState = loadTodosFromLocalstorage();

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // Add a new task
    addTodo: (
      state,
      action: PayloadAction<{
        title: string;
        completed: boolean;
        selectedTimeSlots: string[];
        selectedDate: Date;
        category: CategoryProps[];
      }>
    ) => {
      const newTodo: Todo = {
        id: Date.now().toString(),
        title: action.payload.title,
        completed: action.payload.completed,
        selectedDate: action.payload.selectedDate,
        selectedTimeSlots: action.payload.selectedTimeSlots,
        category: action.payload.category,
      };
      state.todos.push(newTodo);
      savedTodosFromLocalstorage(state.todos, state.completedTodos);
    },

    // Delete a task
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      state.completedTodos = state.completedTodos.filter(
        (todo) => todo.id !== action.payload.id
      );
      savedTodosFromLocalstorage(state.todos, state.completedTodos);
    },

    // Toggle task completed/not completed
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todoIndex = state.todos.findIndex(
        (todo) => todo.id === action.payload
      );
      const completedIndex = state.completedTodos.findIndex(
        (todo) => todo.id === action.payload
      );

      if (todoIndex !== -1) {
        const updatedTodo = { ...state.todos[todoIndex], completed: true };
        state.completedTodos.push(updatedTodo);
        state.todos.splice(todoIndex, 1);
      } else if (completedIndex !== -1) {
        const updatedTodo = {
          ...state.completedTodos[completedIndex],
          completed: false,
        };
        state.todos.push(updatedTodo);
        state.completedTodos.splice(completedIndex, 1);
      }

      savedTodosFromLocalstorage(state.todos, state.completedTodos);
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
