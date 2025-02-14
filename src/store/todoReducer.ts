// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export interface CategoryProps {
//   title: string;
//   emoji?: string;
// }

// export interface Todo {
//   id: string;
//   title: string;
//   completed: boolean;
//   selectedDate?: Date;
//   selectedTimeSlots: string[];
//   category: CategoryProps[];
// }

// // Define the state type
// interface TodoState {
//   todos: Todo[];
//   completedTodos: Todo[];
//   categories: CategoryProps[];
// }

// // const loadCategoriesFromLocalStorage = () => {
// //   const savedCategories = localStorage.getItem("categories");
// //   return savedCategories ? JSON.parse(savedCategories) : [];
// // };

// // Load tasks from local storage
// const loadTodosFromLocalstorage = () => {
//   const savedTodos = localStorage.getItem("tasks");
//   const parsedTodos = savedTodos ? JSON.parse(savedTodos) : [];
//   return {
//     todos: parsedTodos.filter((todo: Todo) => !todo.completed),
//     completedTodos: parsedTodos.filter((todo: Todo) => todo.completed),
//   };
// };

// // Save tasks to local storage
// const savedTodosFromLocalstorage = (todos: Todo[], completedTodos: Todo[]) => {
//   localStorage.setItem("tasks", JSON.stringify([...todos, ...completedTodos]));
// };

// // Load categories from local storage
// const loadCategoriesFromLocalStorage = () => {
//   const savedCategories = localStorage.getItem("categories");
//   return savedCategories ? JSON.parse(savedCategories) : [];
// };

// const initialState: TodoState = {
//   ...loadTodosFromLocalstorage(),
//   categories: loadCategoriesFromLocalStorage(), // ✅ Keep saved categories even if tasks are deleted
// };

// const todoSlice = createSlice({
//   name: "todos",
//   initialState,
//   reducers: {
//     // Add a new task
//     addTodo: (
//       state,
//       action: PayloadAction<{
//         title: string;
//         completed: boolean;
//         selectedTimeSlots: string[];
//         selectedDate: Date;
//         category: CategoryProps[];
//       }>
//     ) => {
//       const newTodo: Todo = {
//         id: Date.now().toString(),
//         title: action.payload.title,
//         completed: action.payload.completed,
//         selectedDate: action.payload.selectedDate,
//         selectedTimeSlots: action.payload.selectedTimeSlots,
//         category: action.payload.category,
//       };

//       state.todos.push(newTodo);

//       // ✅ Ensure category is added only if it doesn't exist
//       action.payload.category.forEach((cat) => {
//         const existingCategory = state.categories.find(
//           (c) => c.title === cat.title
//         );
//         if (!existingCategory) {
//           state.categories.push(cat);
//         }
//       });

//       // Save to localStorage
//       savedTodosFromLocalstorage(state.todos, state.completedTodos);
//       localStorage.setItem("categories", JSON.stringify(state.categories));
//     },

//     // Delete a task
//     deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
//       state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
//       state.completedTodos = state.completedTodos.filter(
//         (todo) => todo.id !== action.payload.id
//       );

//       // 🔹 DO NOT update categories based on tasks—keep them stored persistently

//       savedTodosFromLocalstorage(state.todos, state.completedTodos);
//       localStorage.setItem("categories", JSON.stringify(state.categories)); // ✅ Keep categories unchanged
//     },

//     // Toggle task completed/not completed
//     toggleTodo: (state, action: PayloadAction<string>) => {
//       const todoIndex = state.todos.findIndex(
//         (todo) => todo.id === action.payload
//       );
//       const completedIndex = state.completedTodos.findIndex(
//         (todo) => todo.id === action.payload
//       );

//       if (todoIndex !== -1) {
//         const updatedTodo = { ...state.todos[todoIndex], completed: true };
//         state.completedTodos.push(updatedTodo);
//         state.todos.splice(todoIndex, 1);
//       } else if (completedIndex !== -1) {
//         const updatedTodo = {
//           ...state.completedTodos[completedIndex],
//           completed: false,
//         };
//         state.todos.push(updatedTodo);
//         state.completedTodos.splice(completedIndex, 1);
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
  category: CategoryProps;
}

// Define the state type
interface TodoState {
  todos: Todo[];
  completedTodos: Todo[];
  categories: CategoryProps[];
}

// const loadCategoriesFromLocalStorage = () => {
//   const savedCategories = localStorage.getItem("categories");
//   return savedCategories ? JSON.parse(savedCategories) : [];
// };

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

// Load categories from local storage
const loadCategoriesFromLocalStorage = () => {
  const savedCategories = localStorage.getItem("categories");
  return savedCategories ? JSON.parse(savedCategories) : [];
};

const initialState: TodoState = {
  ...loadTodosFromLocalstorage(),
  categories: loadCategoriesFromLocalStorage(), // ✅ Keep saved categories even if tasks are deleted
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // ✅ Add a new category independently
    addCategory: (state, action: PayloadAction<CategoryProps>) => {
      const exists = state.categories.some((c) => c.title === action.payload.title);
      if (!exists) {
        state.categories.push(action.payload);
        localStorage.setItem("categories", JSON.stringify(state.categories)); // Save to localStorage
      }
    },

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

      // ✅ Ensure categories are added only if they don't exist
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

export const { addCategory, addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
