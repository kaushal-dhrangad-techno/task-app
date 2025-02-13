import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Task";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { CategoryProps, deleteTodo, toggleTodo } from "@/store/todoReducer";
import { Badge } from "./ui/badge";

const CompletedTask = () => {
  const todos = useSelector((state: RootState) => state.todos.completedTodos);
  const dispatch = useDispatch();
  const completedTodos = todos.filter((todo: any) => todo.completed);
  console.log(completedTodos);

  const handleDelete = (id: string) => {
    dispatch(deleteTodo({ id }));
  };

  const handleToggleTodo = (id: string) => {
    console.log("Before dispatch ", todos);
    dispatch(toggleTodo(id));
    console.log("After dispatch ", todos);
  };

  return (
    <div className="md:pl-16 mt-5">
      <ul className="space-y-3">
        {completedTodos.length === 0 ? (
          <div className="flex items-center justify-center text-slate-900  text-xl font-medium  ">
            No tasks available
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-medium text-slate-900 ">
              Completed Task
            </h1>
            {completedTodos.map((todo: any) => (
              <div
                className="grid grid-cols-[auto_1fr_auto] gap-3 items-center bg-white px-4 py-2 rounded-md w-full"
                key={todo.id}
              >
                <Checkbox
                  checked={todo.completed}
                  onClick={() => handleToggleTodo(todo.id)}
                  className="h-4 w-4"
                />
                <div className="flex justify-start items-center gap-6">
                  <p
                    className={`${
                      todo.completed ? "line-through" : ""
                    } flex justify-start items-center text-md md:text-lg text-clip pr-2`}
                  >
                    {todo.title}
                  </p>

                  {/* Category Badges - Wrapped in flex to align properly */}
                  <div className="flex gap-2 flex-wrap">
                    {todo.category.map((cat:CategoryProps, index: number) => (
                      <Badge key={index} className="flex px-2 py-1">
                        {cat.title}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Badge
                    variant="secondary"
                    className="flex justify-end mr-5  border border-slate-300"
                  >
                    {todo.selectedTimeSlots}
                  </Badge>

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
  );
};

export default CompletedTask;
