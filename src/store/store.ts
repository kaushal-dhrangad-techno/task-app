import todoReducer from "./todoReducer";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    todos: todoReducer,
  },
});
