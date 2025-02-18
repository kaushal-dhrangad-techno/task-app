// import { useDispatch, useSelector } from "react-redux";
// import { Checkbox } from "./ui/checkbox";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "./ui/button";
// import {
//   CategoryProps,
//   deleteTodo,
//   markPendingRemoval,
//   Todo,
//   toggleTodo,
// } from "../store/todoReducer";
// import { Badge } from "@/components/ui/badge";
// import { motion } from "motion/react";

// export interface RootState {
//   todos: {
//     todos: Todo[];
//     categories: CategoryProps[];
//   };
// }

// const Task = () => {
//   const todos = useSelector((state: RootState) => state.todos.todos);
//   const dispatch = useDispatch();

//   const handleDelete = (id: string) => {
//     dispatch(markPendingRemoval({ id }));

//     setTimeout(() => {
//       dispatch(deleteTodo({ id }));
//     }, 700);
//   };

//   const handleToggleTodo = (id: string) => {
//     dispatch(toggleTodo(id));
//   };

//   // Animation
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
//     <ScrollArea className="max-h-[80vh] mb-14 rounded-md">
//       <motion.div
//         className="md:pl-16 mt-3"
//         variants={containerVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <ul className="space-y-3">
//           {todos.length === 0 ? (
//             <div className="flex items-center justify-center text-xl font-medium ">
//               No tasks available
//             </div>
//           ) : (
//             <>
//               <h1 className="text-2xl font-medium text-slate-900 ">
//                 All the tasks
//               </h1>
//               {todos.map((todo: Todo) => (
//                 <motion.div
//                   className="grid grid-cols-[auto_1fr_auto_auto] gap-4 items-center bg-white px-4 py-2 rounded-md w-full"
//                   key={todo.id}
//                   variants={itemVariants}
//                 >
//                   {/* Checkbox */}
//                   <Checkbox
//                     checked={todo.completed}
//                     onClick={() => handleToggleTodo(todo.id)}
//                     className="h-4 w-4"
//                   />
//                   {/* Task Title & Emoji */}
//                   <div className="flex justify-start items-center gap-1">
//                     {/* Task Title */}
//                     <p
//                       className={`${
//                         todo.completed ? "line-through" : ""
//                       } flex justify-start items-center text-md md:text-lg text-clip pr-2`}
//                     >
//                       {todo.title}
//                     </p>

//                     {/* Category Badges with Emojis  */}
//                     <div className="flex gap-2 flex-wrap">
//                       {todo.category.map((cat, index) => (
//                         <Badge
//                           key={index}
//                           className="flex items-center gap-1 px-2 py-1"
//                           variant="secondary"
//                         >
//                           {/* Add a console.log to verify the data */}
//                           {console.log("Category data:", cat)}
//                           <span>{cat.emoji}</span>
//                           <span>{cat.title}</span>
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
//                       {todo.pendingRemoval ? "Removing...." : "Delete"}
//                     </Button>
//                   </div>
//                 </motion.div>
//               ))}
//             </>
//           )}
//         </ul>
//       </motion.div>
//     </ScrollArea>
//   );
// };

// export default Task;

import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";
import {
  CategoryProps,
  deleteTodo,
  markPendingRemoval,
  Todo,
  toggleTodo,
} from "../../store/todoReducer";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

export interface RootState {
  todos: {
    todos: Todo[];
    categories: CategoryProps[];
  };
}

const Task = () => {
  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();
  const [animatingTodo, setAnimatingTodo] = useState<string | null>(null);
  const [textWidths, setTextWidths] = useState<{ [key: string]: number }>({});
  const textRefs = useRef<{ [key: string]: HTMLParagraphElement }>({});

  useEffect(() => {
    // Measure text widths after render
    Object.entries(textRefs.current).forEach(([id, element]) => {
      if (element) {
        setTextWidths((prev) => ({
          ...prev,
          [id]: element.offsetWidth,
        }));
      }
    });
  }, [todos]);

  const handleDelete = (id: string) => {
    dispatch(markPendingRemoval({ id }));

    setTimeout(() => {
      dispatch(deleteTodo({ id }));
    }, 700);
  };

  const handleToggleTodo = (id: string) => {
    if (animatingTodo) return;

    setAnimatingTodo(id);

    setTimeout(() => {
      dispatch(toggleTodo(id));
      setAnimatingTodo(null);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
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
                  <motion.div
                    onClick={() => handleToggleTodo(todo.id)}
                    className={`h-5 w-5 border-2 rounded-md flex items-center justify-center cursor-pointer ${
                      todo.completed
                        ? "border-green-500 bg-blue-600"
                        : "border-gray-400"
                    }`}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{
                        pathLength:
                          todo.completed || animatingTodo === todo.id ? 1 : 0,
                        opacity:
                          todo.completed || animatingTodo === todo.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                    >
                      <path
                        d="M5 12L10 17L20 7"
                        stroke="green"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </motion.svg>
                  </motion.div>

                  <div className="flex justify-start items-center gap-1">
                    <div className="relative">
                      <p
                        ref={(el) => {
                          if (el) textRefs.current[todo.id] = el;
                        }}
                        className="flex justify-start items-center text-md md:text-lg text-clip pr-2"
                      >
                        {todo.title}
                      </p>
                      {(todo.completed || animatingTodo === todo.id) && (
                        <div
                          className="absolute inset-0 flex items-center pointer-events-none"
                          style={{ width: `${textWidths[todo.id]}px` }}
                        >
                          <motion.svg
                            className="w-full h-8"
                            viewBox="150 140 90 100"
                            preserveAspectRatio="none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                          >
                            <motion.path
                              d="M153.81166076660156,186.54708862304688C161.58445739746094,177.27952575683594,172.64574686686197,155.4559122721354,177.1300506591797,158.74440002441406C181.6143544514974,162.03288777669272,163.0792236328125,191.9282480875651,167.2645721435547,196.4125518798828C171.44992065429688,200.89685567220053,184.6038818359375,169.50672912597656,189.68609619140625,172.1973114013672C194.768310546875,174.8878936767578,179.52167765299478,201.19581095377603,182.51121520996094,204.4842987060547C185.5007527669271,207.77278645833334,193.27354431152344,179.37218729654947,198.6547088623047,182.06277465820312C204.03587341308594,184.75336201985678,195.36622111002603,207.47384643554688,198.6547088623047,212.55606079101562C201.94319661458334,217.63827514648438,203.13900756835938,196.71151224772134,208.52017211914062,197.30941772460938C213.90133666992188,197.9073232014974,205.82958984375,210.46337890625,214.79820251464844,214.3497772216797C223.76681518554688,218.23617553710938,228.5500742594401,210.76233418782553,235.42601013183594,208.96861267089844"
                              fill="none"
                              strokeWidth="6"
                              // strokeWidth="6"
                              // stroke="hsl(0, 0%, 20%)"
                              stroke="hsl(222.2 84% 4.9%)"
                              strokeLinecap="round"
                              transform="matrix(1.2592779846426774,-0.45833970307666666,0.45833970307666666,1.2592779846426774,-136.05602520431245,40.719475869384155)"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 1, ease: "easeInOut" }}
                            />
                          </motion.svg>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {todo.category.map((cat, index) => (
                        <Badge
                          key={index}
                          className="flex items-center gap-1 px-2 py-1"
                          variant="secondary"
                        >
                          <span>{cat.emoji}</span>
                          <span>{cat.title}</span>
                        </Badge>
                      ))}
                    </div>
                  </div>

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
                      {todo.pendingRemoval ? "Removing..." : "Delete"}
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
