import { useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface RootState {
  todos: Todo[];
}

const Task = () => {
  const todos = useSelector<RootState, Todo[]>((state) => state.todos);
  return (
    <ScrollArea className="max-h-[80vh] rounded-md ">
      <div className="p-4">
        {/* <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4> */}
        <ul>
          {todos.map((todo) => (
            // <>
            <div className="flex justify-start items-center mt-3 ml-12 bg-white px-4 py-2 rounded-md">
              <Checkbox />
              <li className="pl-6" key={todo.id}>
                {todo.title}
              </li>
            </div>
          ))}
          {/* <Separator className="my-2" /> */}
          {/* </> */}
        </ul>
      </div>
    </ScrollArea>
  );
};
export default Task;
