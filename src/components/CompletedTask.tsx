import { useSelector } from "react-redux";
import { RootState } from "./Task";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

const CompletedTask = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  return (
    <></>
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
