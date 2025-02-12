import { useSelector } from "react-redux";
import { RootState } from "./Task";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const CompletedTask = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);

  const completedTodos = todos.filter((todo: any) => todo.completed);
  console.log(completedTodos);

  return (
    <div className="md:pl-16 mt-5">
      <ul className="space-y-3">
        {completedTodos.length === 0 ? (
          <div className="flex items-center justify-center ">
            No tasks available
          </div>
        ) : (
          completedTodos.map((todo: any) => (
            <div
              className="grid grid-cols-[auto_1fr_auto] gap-3 items-center bg-white px-4 py-2 rounded-md w-full"
              key={todo.id}
            >
              <Checkbox
                checked={todo.completed}
                // onClick={() => handleToggleTodo(todo.id)}
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
                // onClick={() => handleDelete(todo.id)}
              >
                Delete
              </Button>
            </div>
          ))
        )}
      </ul>
    </div>
    // <div>
    //   {todos.map((todo: any) => {
    //     <div
    //       className="grid grid-cols-[auto_1fr_auto] gap-3 items-center bg-white px-4 py-2 rounded-md w-full"
    //       key={todo.id}
    //     >
    //       <Checkbox
    //         checked={todo.completed}
    //         // onClick={() => handleToggleTodo(todo.id)}
    //         className="h-4 w-4"
    //       />
    //       <p
    //         className={`${
    //           todo.completed ? "line-through" : ""
    //         } text-md flex justify-start text-clip pr-2`}
    //       >
    //         {todo.title}
    //       </p>
    //       <Button
    //         variant="destructive"
    //         size="sm"
    //         // onClick={() => handleDelete(todo.id)}
    //       >
    //         Delete
    //       </Button>
    //     </div>;
    //   })}
    // </div>
  );
};

export default CompletedTask;
