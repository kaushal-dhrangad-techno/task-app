import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { deleteTodo, toggleTodo } from "../store/todoReducer";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface RootState {
  todos: Todo[];
}

const Task = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTodo({ id }));
  };

  const handleToggleTodo = (id: string) => {
    console.log("Before dispatch ", todos)
    dispatch(toggleTodo(id)); 
    console.log("After dispatch ", todos)
  };

  return (
    <ScrollArea className="max-h-[80vh] mb-14 rounded-md">
      <div className="md:pl-16 mt-5">
        <ul className="space-y-3">
          {todos.length === 0 ? (
            <div className="flex items-center justify-center ">
              No tasks available
            </div>
          ) : (
            todos.map((todo: any) => (
              <div
                className="grid grid-cols-[auto_1fr_auto] gap-3 items-center bg-white px-4 py-2 rounded-md w-full"
                key={todo.id}
              >
                <Checkbox
                  checked={todo.completed}
                  onClick={() => handleToggleTodo(todo.id)}
                  className="h-4 w-4"
                />
                <p
                  className={`${
                    todo.completed ? "line-through" : ""
                  } text-md flex justify-start text-clip pr-2`}
                >
                  {todo.title}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(todo.id)}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </ul>
      </div>
    </ScrollArea>
  );
};

export default Task;