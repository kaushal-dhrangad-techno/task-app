import { useSelector } from "react-redux";

interface Todo {
  title: string;
  completed: boolean;
}

interface RootState {
  todos: Todo[];
}
const Test = () => {
  const todos = useSelector<RootState, Todo[]>((state) => state.todos);
  return (
    <div>
     
    </div>
  );
};

export default Test;
