// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "./Task";
// import { Button } from "./ui/button";
// import { Checkbox } from "./ui/checkbox";
// import { CategoryProps, deleteTodo, toggleTodo } from "@/store/todoReducer";
// import { Badge } from "./ui/badge";
// import { motion } from "motion/react";

// const CompletedTask = () => {
//   const todos = useSelector((state: RootState) => state.todos.completedTodos);
//   const dispatch = useDispatch();
//   const completedTodos = todos.filter((todo: any) => todo.completed);
//   console.log(completedTodos);

//   const handleDelete = (id: string) => {
//     dispatch(deleteTodo({ id }));
//   };

//   const handleToggleTodo = (id: string) => {
//     console.log("Before dispatch ", todos);
//     dispatch(toggleTodo(id));
//     console.log("After dispatch ", todos);
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.5 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <motion.div
//       className="md:pl-16 mt-5"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <ul className="space-y-3">
//         {completedTodos.length === 0 ? (
//           <div className="flex items-center justify-center text-slate-900  text-xl font-medium  ">
//             No tasks available
//           </div>
//         ) : (
//           <>
//             <h1 className="text-2xl font-medium text-slate-900 ">
//               Completed Task
//             </h1>
//             {completedTodos.map((todo: any) => (
//               <motion.div
//                 className="grid grid-cols-[auto_1fr_auto] gap-3 items-center bg-white px-4 py-2 rounded-md w-full"
//                 key={todo.id}
//                 variants={itemVariants}
//               >
//                 <Checkbox
//                   checked={todo.completed}
//                   onClick={() => handleToggleTodo(todo.id)}
//                   // className="h-5 w-5"
//                   className={`h-5 w-5 border-2 rounded-md flex items-center justify-center cursor-pointer ${
//                     todo.completed
//                       ? "border-slate-900 bg-green-100"
//                       : "border-gray-400"
//                   }`}
//                 />
//                 <div className="flex justify-start items-center gap-6">
//                   <p
//                     className={`${
//                       todo.completed ? "line-through" : ""
//                     } flex justify-start items-center text-md md:text-lg text-clip pr-2`}
//                   >
//                     {todo.title}
//                   </p>

//                   {/* Category Badges - Wrapped in flex to align properly */}
//                   <div className="flex gap-2 flex-wrap">
//                     {todo.category.map((cat: CategoryProps, index: number) => (
//                       <Badge
//                         key={index}
//                         className="flex px-2 py-1"
//                         variant="secondary"
//                       >
//                         {cat.title}
//                       </Badge>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="flex justify-center items-center">
//                   <Badge
//                     variant="secondary"
//                     className="flex justify-end mr-5  border border-slate-300"
//                   >
//                     {todo.selectedTimeSlots}
//                   </Badge>

//                   <Button
//                     variant="destructive"
//                     size="sm"
//                     onClick={() => handleDelete(todo.id)}
//                   >
//                     Delete
//                   </Button>
//                 </div>
//               </motion.div>
//             ))}
//           </>
//         )}
//       </ul>
//     </motion.div>
//   );
// };

// export default CompletedTask;
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { RootState } from "./Task";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { CategoryProps, deleteTodo, toggleTodo } from "@/store/todoReducer";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";

const CompletedTask = () => {
  const todos = useSelector((state: RootState) => state.todos.completedTodos);
  const dispatch = useDispatch();
  const completedTodos = todos.filter((todo: any) => todo.completed);

  const textRefs = useRef<{ [key: string]: HTMLParagraphElement | null }>({});
  const [textWidths, setTextWidths] = useState<{ [key: string]: number }>({});
  const [undoStrike, setUndoStrike] = useState<{ [key: string]: boolean }>({});

  // Track when to remove the task after animation completes
  const [tasksToRemove, setTasksToRemove] = useState<Set<string>>(new Set());

  useEffect(() => {
    const newWidths: { [key: string]: number } = {};
    Object.entries(textRefs.current).forEach(([id, element]) => {
      if (element) {
        newWidths[id] = element.offsetWidth;
      }
    });
    setTextWidths(newWidths);
  }, [todos]);

  const handleDelete = (id: string) => {
    dispatch(deleteTodo({ id }));
  };

  const handleToggleTodo = (id: string) => {
    const toggledTodo = completedTodos.find((todo) => todo.id === id);
    if (!toggledTodo) return;

    if (toggledTodo.completed) {
      // Start reverse animation, set undoStrike to true
      setUndoStrike((prev) => ({ ...prev, [id]: true }));

      // Wait for animation to finish, then remove the task
      setTimeout(() => {
        dispatch(toggleTodo(id));
        setUndoStrike((prev) => ({ ...prev, [id]: false }));
      }, 400); // Wait 400ms to let the reverse animation finish
    } else {
      // When unchecked, just toggle and no animation needed
      dispatch(toggleTodo(id));
    }
  };

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
    <motion.div
      className="md:pl-16 mt-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ul className="space-y-3">
        {completedTodos.length === 0 ? (
          <div className="flex items-center justify-center text-slate-900 text-xl font-medium">
            No tasks available
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-medium text-slate-900">
              Completed Task
            </h1>
            {completedTodos.map((todo: any) => (
              <motion.div
                className="grid grid-cols-[auto_1fr_auto] gap-3 items-center bg-white px-4 py-2 rounded-md w-full"
                key={todo.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <Checkbox
                  checked={todo.completed}
                  onClick={() => handleToggleTodo(todo.id)}
                  className={`h-5 w-5 border-2 rounded-md flex items-center justify-center cursor-pointer ${
                    todo.completed
                      ? "border-slate-900 bg-green-100"
                      : "border-gray-400"
                  }`}
                />
                <div className="flex justify-start items-center gap-6 relative text-md md:text-lg">
                  <p
                    ref={(el) => (textRefs.current[todo.id] = el)}
                    className="pr-2"
                  >
                    {todo.title}
                  </p>

                  {/* Strikethrough Animation */}
                  <motion.div
                    className="absolute left-0 top-1/2 h-[2px] bg-black"
                    initial={{ width: 0, right: "auto", left: 0 }}
                    animate={
                      todo.completed && !undoStrike[todo.id]
                        ? {
                            width: textWidths[todo.id] || 0,
                            left: 0,
                            right: "auto",
                            transition: {
                              duration: 0.4,
                              ease: "easeInOut",
                              // delay: 0.2,
                              delay: 0.4,
                            },
                          }
                        : {
                            width: 0,
                            left: "auto",
                            right: 0,
                            transition: { duration: 0.4, ease: "easeInOut" },
                          }
                    }
                  />

                  {/* Category Badges */}
                  <div className="flex gap-2 flex-wrap">
                    {todo.category.map((cat: CategoryProps, index: number) => (
                      <Badge
                        key={index}
                        className="flex px-2 py-1"
                        variant="secondary"
                      >
                        {cat.title}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Time Slot & Delete Button */}
                <div className="flex justify-center items-center">
                  <Badge
                    variant="secondary"
                    className="flex justify-end mr-5 border border-slate-300"
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
  );
};

export default CompletedTask;
