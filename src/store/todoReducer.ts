// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface CategoryProps {
//   title: string
//   emoji?: string
// }
// export interface Todo {
//   id: string;
//   title: string;
//   completed: boolean;
//   selectedDate?: Date;
//   selectedTimeSlots: string[];
//   category: CategoryProps[]
// }

// // Define the state type
// interface TodoState {
//   todos: Todo[];
//   completedTodos: Todo[];
// }

// // Define the initial state

// const loadTodosFromLocalstorage = () => {
//   const savedTodos = localStorage.getItem("tasks");
//   const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
//   return {
//     todos: parsedTodos.filter((todo: Todo) => !todo.completed), //
//     completedTodos: parsedTodos.filter((todo: Todo) => todo.completed),
//   };
// };

// const savedTodosFromLocalstorage = (todos: Todo[], completedTodos: Todo[]) => {
//   let allTasks = [...todos, ...completedTodos];
//   localStorage.setItem("tasks", JSON.stringify(allTasks));
// };

// const initialState: TodoState = loadTodosFromLocalstorage();

// const todoSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     // Add a new Todo
//     addTodo: (
//       state,
//       action: PayloadAction<{ title: string; completed: boolean, selectedTimeSlots: Todo[], selectedDate:Date, category: CategoryProps[] }>
//     ) => {
//       const newTodo: Todo = {
//         id: Date.now().toString(),
//         title: action.payload.title,
//         completed: action.payload.completed,
//         selectedDate: action.payload.selectedDate,
//         selectedTimeSlots: action.payload.selectedTimeSlots,
//         category: action.payload.category
//       };
//       state.todos.push(newTodo);
//       savedTodosFromLocalstorage(state.todos, state.completedTodos);
//       // console.log("This is new Todo from reducer file", newTodo.selectedTimeSlots)
//     },
//     // Delete a Todo
//     deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload.id); // Remove the Todo with the given ID
//       state.completedTodos = state.completedTodos.filter(
//         (todo) => todo.id !== action.payload.id
//       );
//       savedTodosFromLocalstorage(state.todos, state.completedTodos);
//     },

//     // Toggle task completed or not
//     toggleTodo: (state, action) => {
//       const todoInTodos = state.todos.find(
//         (todo) => todo.id === action.payload
//       );
//       const todoInCompleted = state.completedTodos.find(
//         (todo) => todo.id === action.payload
//       );
//       if (todoInTodos) {
//         todoInTodos.completed = !todoInTodos.completed; // Toggle completion
//         state.completedTodos.push(todoInTodos); // Add to completedTodos
//         state.todos = state.todos.filter((t) => t.id !== todoInTodos.id); // Remove from todos
//       } else if (todoInCompleted) {
//         todoInCompleted.completed = !todoInCompleted.completed; // Toggle completion
//         state.todos.push(todoInCompleted); // Add to todos
//         state.completedTodos = state.completedTodos.filter(
//           (t) => t.id !== todoInCompleted.id // Remove from completedTodos
//         );
//       }
//       savedTodosFromLocalstorage(state.todos, state.completedTodos);
//     },
//   },
// });

// export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;

// export default todoSlice.reducer;

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
      action: PayloadAction<{ title: string; completed: boolean; selectedTimeSlots: string[]; selectedDate: Date; category: CategoryProps[] }>
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
      state.completedTodos = state.completedTodos.filter((todo) => todo.id !== action.payload.id);
      savedTodosFromLocalstorage(state.todos, state.completedTodos);
    },

    // Toggle task completed/not completed
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload);
      const completedIndex = state.completedTodos.findIndex((todo) => todo.id === action.payload);

      if (todoIndex !== -1) {
        const updatedTodo = { ...state.todos[todoIndex], completed: true };
        state.completedTodos.push(updatedTodo);
        state.todos.splice(todoIndex, 1);
      } else if (completedIndex !== -1) {
        const updatedTodo = { ...state.completedTodos[completedIndex], completed: false };
        state.todos.push(updatedTodo);
        state.completedTodos.splice(completedIndex, 1);
      }

      savedTodosFromLocalstorage(state.todos, state.completedTodos);
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
