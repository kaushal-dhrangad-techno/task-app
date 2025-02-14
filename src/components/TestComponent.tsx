import { useDispatch } from "react-redux";
import { addCategory } from "@/store/todoReducer";
import { useEffect } from "react";

const TestComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addCategory({ title: "🔥 Test Category", emoji: "🚀" }));
  }, [dispatch]);

  return null;
};

export default TestComponent;
