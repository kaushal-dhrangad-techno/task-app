// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface CategoryProps {
//   title: string;
//   emoji?: string;
// }

// export interface Todo {
//   id: string;
//   title: string;
//   completed: boolean;
//   selectedDate?: string; // Store as string (ISO format)
//   selectedTimeSlots: string[]; // Ensure it's always an array
//   category: CategoryProps[];
// }

// // Define the state type
// interface TodoState {
//   todos: Todo[];
//   completedTodos: Todo[];
//   categories: CategoryProps[]; // ✅ Added categories
// }

// // Load tasks from local storage
// const loadTodosFromLocalstorage = (): TodoState => {
//   const savedTodos = localStorage.getItem("tasks");
//   const savedCategories = localStorage.getItem("categories");

//   return {
//     todos: savedTodos ? JSON.parse(savedTodos).filter((todo: Todo) => !todo.completed) : [],
//     completedTodos: savedTodos ? JSON.parse(savedTodos).filter((todo: Todo) => todo.completed) : [],
//     categories: savedCategories ? JSON.parse(savedCategories) : [],
//   };
// };

// // Save tasks to local storage
// const savedTodosFromLocalstorage = (todos: Todo[], completedTodos: Todo[]) => {
//   localStorage.setItem("tasks", JSON.stringify([...todos, ...completedTodos]));
// };

// const initialState: TodoState = loadTodosFromLocalstorage();

// const todoSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     // ✅ Add a new category independently
//     addCategory: (state, action: PayloadAction<CategoryProps>) => {
//       const exists = state.categories.some((c) => c.title === action.payload.title);
//       if (!exists) {
//         state.categories.push(action.payload);
//         localStorage.setItem("categories", JSON.stringify(state.categories)); // Save to localStorage
//       }
//     },

//     addTodo: (
//       state,
//       action: PayloadAction<{
//         id: string;
//         title: string;
//         completed: boolean;
//         selectedTimeSlots: string[]; // ✅ Store as an array
//         selectedDate?: string; // ✅ Store date as a string
//         category: CategoryProps[];
//       }>
//     ) => {
//       const newTodo: Todo = {
//         id: action.payload.id,
//         title: action.payload.title,
//         completed: action.payload.completed,
//         selectedDate: action.payload.selectedDate, // Store as string
//         selectedTimeSlots: action.payload.selectedTimeSlots, // Keep array
//         category: action.payload.category,
//       };

//       state.todos.push(newTodo);

//       // ✅ Ensure categories are added only if they don't exist
//       action.payload.category.forEach((cat) => {
//         if (!state.categories.some((c) => c.title === cat.title)) {
//           state.categories.push(cat);
//         }
//       });

//       savedTodosFromLocalstorage(state.todos, state.completedTodos);
//       localStorage.setItem("categories", JSON.stringify(state.categories));
//     },

//     deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
//       state.completedTodos = state.completedTodos.filter((todo) => todo.id !== action.payload.id);

//       savedTodosFromLocalstorage(state.todos, state.completedTodos);
//       localStorage.setItem("categories", JSON.stringify(state.categories));
//     },

//     toggleTodo: (state, action: PayloadAction<string>) => {
//       const todoIndex = state.todos.findIndex((todo) => todo.id === action.payload);
//       const completedIndex = state.completedTodos.findIndex((todo) => todo.id === action.payload);

//       if (todoIndex !== -1) {
//         const updatedTodo = { ...state.todos[todoIndex], completed: true };
//         state.completedTodos.push(updatedTodo);
//         state.todos.splice(todoIndex, 1);
//       } else if (completedIndex !== -1) {
//         const updatedTodo = { ...state.completedTodos[completedIndex], completed: false };
//         state.todos.push(updatedTodo);
//         state.completedTodos.splice(completedIndex, 1);
//       }

//       savedTodosFromLocalstorage(state.todos, state.completedTodos);
//     },
//   },
// });

// export const { addCategory, addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
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
  selectedDate?: string; // Store as string (ISO format)
  selectedTimeSlots: string[]; // Ensure it's always an array
  category: CategoryProps[];
  selectedEmoji?: string; // Add selected emoji to Todo
}

// Define the state type
interface TodoState {
  todos: Todo[];
  completedTodos: Todo[];
  categories: CategoryProps[]; // Categories with emoji
}

// Load tasks from local storage
const loadTodosFromLocalstorage = (): TodoState => {
  const savedTodos = localStorage.getItem("tasks");
  const savedCategories = localStorage.getItem("categories");

  return {
    todos: savedTodos
      ? JSON.parse(savedTodos).filter((todo: Todo) => !todo.completed)
      : [],
    completedTodos: savedTodos
      ? JSON.parse(savedTodos).filter((todo: Todo) => todo.completed)
      : [],
    categories: savedCategories ? JSON.parse(savedCategories) : [],
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
    // Add a new category independently
    addCategory: (state, action: PayloadAction<CategoryProps>) => {
      const exists = state.categories.some(
        (c) => c.title === action.payload.title
      );
      if (!exists) {
        state.categories.push(action.payload);
        localStorage.setItem("categories", JSON.stringify(state.categories)); // Save to localStorage
      }
    },

    addTodo: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        completed: boolean;
        selectedTimeSlots: string[]; // Store as an array
        selectedDate?: string; // Store date as a string
        category: CategoryProps[];
        selectedEmoji?: string; // Store selected emoji for task
      }>
    ) => {
      const newTodo: Todo = {
        id: action.payload.id,
        title: action.payload.title,
        completed: action.payload.completed,
        selectedDate: action.payload.selectedDate, // Store as string
        selectedTimeSlots: action.payload.selectedTimeSlots, // Keep array
        category: action.payload.category,
        selectedEmoji: action.payload.selectedEmoji, // Store emoji for task
      };

      state.todos.push(newTodo);

      // Ensure categories are added only if they don't exist
      action.payload.category.forEach((cat) => {
        if (!state.categories.some((c) => c.title === cat.title)) {
          state.categories.push(cat);
        }
      });

      savedTodosFromLocalstorage(state.todos, state.completedTodos);
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      state.completedTodos = state.completedTodos.filter(
        (todo) => todo.id !== action.payload.id
      );

      savedTodosFromLocalstorage(state.todos, state.completedTodos);
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },

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

export const { addCategory, addTodo, deleteTodo, toggleTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
