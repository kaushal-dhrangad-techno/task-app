// import { useDispatch, useSelector } from "react-redux";
// import { Checkbox } from "./ui/checkbox";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "./ui/button";
// import { deleteTodo, Todo, toggleTodo } from "../store/todoReducer";
// import { Badge } from "@/components/ui/badge";
// import { secondsInDay } from "date-fns/constants";

// export interface RootState {
//   todos: Todo[];
// }

// const Task = () => {
//   const todos = useSelector((state: RootState) => state.todos.todos);
//   const dispatch = useDispatch();

//   const handleDelete = (id: string) => {
//     dispatch(deleteTodo({ id }));
//   };

//   const handleToggleTodo = (id: string) => {
//     // console.log("Before dispatch ", todos);
//     dispatch(toggleTodo(id));
//     // console.log("After dispatch ", todos);
//   };

//   console.log(todos);

//   return (
//     <ScrollArea className="max-h-[80vh] mb-14 rounded-md">
//       <div className="md:pl-16 mt-3">
//         <ul className="space-y-3">
//           {todos.length === 0 ? (
//             <div className="flex items-center justify-center text-xl font-medium ">
//               No tasks available
//             </div>
//           ) : (
//             <>
//               <h1 className="text-2xl font-medium text-slate-900 ">
//                 All the task
//               </h1>
//               {todos.map((todo: Todo) => (
//                 <div
//                   className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center bg-white px-4 py-2 rounded-md w-full"
//                   key={todo.id}
//                 >
//                   {/* Checkbox */}
//                   <Checkbox
//                     checked={todo.completed}
//                     onClick={() => handleToggleTodo(todo.id)}
//                     className="h-4 w-4"
//                   />

//                   {/* Task Title */}
//                   <div className="flex justify-start items-center gap-1">
//                     <p
//                       className={`${
//                         todo.completed ? "line-through" : ""
//                       } flex justify-start items-center text-md md:text-lg text-clip pr-2`}
//                     >
//                       {todo.title}
//                     </p>

//                     {/* Category Badges - Wrapped in flex to align properly */}
//                     <div className="flex gap-2 flex-wrap">
//                       {todo.category.map((cat, index) => (
//                         <Badge key={index} className="flex px-2 py-1" variant="secondary" >
//                           {cat.title}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Time Slots & Delete Button */}
//                   <div className="flex gap-3 items-center">
//                     <Badge
//                       variant="secondary"
//                       className="border border-slate-300 text-[10px]"
//                     >
//                       {todo.selectedTimeSlots}
//                     </Badge>
//                     <Button
//                       variant="destructive"
//                       size="sm"
//                       onClick={() => handleDelete(todo.id)}
//                     >
//                       Delete
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </>
//           )}
//         </ul>
//       </div>
//     </ScrollArea>
//   );
// };

// export default Task;

// *************************************************************************************************************
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "./ui/button";
import { deleteTodo, Todo, toggleTodo } from "../store/todoReducer";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

export interface RootState {
  todos: {
    todos: Todo[];
    categories: CategoryProps[];
  };
}

const Task = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTodo({ id }));
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  // Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <ScrollArea className="max-h-[80vh] mb-14 rounded-md">
      <motion.div
        className="md:pl-16 mt-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <ul className="space-y-3">
          {todos.length === 0 ? (
            <div className="flex items-center justify-center text-xl font-medium ">
              No tasks available
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-medium text-slate-900 ">
                All the tasks
              </h1>
              {todos.map((todo: Todo) => (
                <motion.div
                  className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center bg-white px-4 py-2 rounded-md w-full"
                  key={todo.id}
                  variants={itemVariants}
                >
                  {/* Checkbox */}
                  <Checkbox
                    checked={todo.completed}
                    onClick={() => handleToggleTodo(todo.id)}
                    className="h-4 w-4"
                  />
                  {/* Task Title & Emoji */}
                  <div className="flex justify-start items-center gap-1">
                    {/* Task Title */}
                    <p
                      className={`${
                        todo.completed ? "line-through" : ""
                      } flex justify-start items-center text-md md:text-lg text-clip pr-2`}
                    >
                      {todo.title}
                    </p>

                    {/* Category Badges with Emojis */}
                    <div className="flex gap-2 flex-wrap">
                      {todo.category.map((cat, index) => (
                        <Badge
                          key={index}
                          className="flex items-center gap-1 px-2 py-1"
                          variant="secondary"
                        >
                          {/* Add a console.log to verify the data */}
                          {console.log("Category data:", cat)}
                          <span>{cat.emoji}</span>
                          <span>{cat.title}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {/* Time Slots & Delete Button */}
                  <div className="flex gap-3 items-center">
                    <Badge
                      variant="secondary"
                      className="border border-slate-300 text-[10px]"
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
                </motion.div>
              ))}
            </>
          )}
        </ul>
      </motion.div>
    </ScrollArea>
  );
};

export default Task;
