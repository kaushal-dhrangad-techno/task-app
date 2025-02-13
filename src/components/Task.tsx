import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { deleteTodo, Todo, toggleTodo } from "../store/todoReducer";
import { Badge } from "@/components/ui/badge";

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
    // console.log("Before dispatch ", todos);
    dispatch(toggleTodo(id));
    // console.log("After dispatch ", todos);
  };

  console.log(todos);

  return (
    <ScrollArea className="max-h-[80vh] mb-14 rounded-md">
      <div className="md:pl-16 mt-3">
        <ul className="space-y-3">
          {todos.length === 0 ? (
            <div className="flex items-center justify-center text-xl font-medium ">
              No tasks available
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-medium text-slate-900 ">
                All the task
              </h1>
              {todos.map((todo: Todo) => (
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
                    } text-md md:text-lg flex justify-start text-clip pr-2`}
                  >
                    {todo.title}
                  </p>
                  <div className="flex justify-center items-center ">
                    <Badge
                      variant="secondary"
                      className="flex justify-end mx-3 items-center   border border-slate-300 rounded-sm md:rounded-full text-[10px]"
                    >
                      {todo.selectedTimeSlots}
                    </Badge>
                    {/* <div className=""> */}
                    {/* <div
                        // variant="secondary"
                        className="flex font-semibold text-[12px] justify-end px-1   rounded-lg  border border-slate-300"
                      >
                        {todo.selectedTimeSlots}
                      </div> */}
                    {/* </div> */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </>
          )}
        </ul>
      </div>
    </ScrollArea>
  );
};

export default Task;
