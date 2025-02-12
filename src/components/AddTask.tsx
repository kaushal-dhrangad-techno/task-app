// import { useEffect, useState } from "react";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useDispatch } from "react-redux";
// import { addTodo } from "@/store/todoReducer";
// import Test from "./Test";
// import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
// import { Calendar } from "./ui/calendar";
// import { format, isBefore, startOfDay } from "date-fns";
// import { CalendarIcon, ClockIcon } from "lucide-react";
// const AddTask = () => {
//   const dispatch = useDispatch();
//   const [newTask, setNewTask] = useState("");
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedSlots, setSelectedSlots] = useState<string[]>([]); // State to store selected time slots
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   const handleAddTask = () => {
//     dispatch(addTodo({ title: newTask, completed: false }));
//     setNewTask("");
//     setIsOpen(false);
//   };

//   const handleSlotSelect = (slots: string[]) => {
//     console.log("Selected Time Slots:", slots);
//     setSelectedSlots(slots); // Update state with selected slots
//   };

//   useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         setIsOpen((prev) => !prev);
//       }
//     };

//     document.addEventListener("keydown", down);
//     return () => document.removeEventListener("keydown", down);
//   }, []);

//   return (
//     // ⬇ Fixed at the bottom of the page
//     <div className="fixed bottom-0 left-0 mt-6 right-0 bg-transparent  shadow-lg  flex justify-center">
//       <div className="md:w-[35%] mx-auto py-2">
//         <Drawer open={isOpen} onOpenChange={setIsOpen}>
//           <DrawerTrigger asChild>
//             <div className="relative cursor-pointer">
//               <div className="flex items-center text-sm rounded-md w-full px-4 py-2 bg-slate-900 text-white md:rounded-full border border-slate-700 hover:border-slate-600 transition-colors">
//                 <div className="flex-1 text-slate-400 md:text-[16px]">
//                   Create New Task
//                 </div>
//                 <kbd className="inline-flex h-6 items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2 font-mono text-sm font-medium text-slate-300">
//                   <span className="text-xs">⌘ +</span>J
//                 </kbd>
//               </div>
//             </div>
//           </DrawerTrigger>

//           <DrawerContent className="mx-auto max-w-2xl justify-center flex items-center ">
//             <div className="mx-auto w-full max-w-lg">
//               <DrawerHeader className="text-center flex justify-center flex-col items-center">
//                 <DrawerTitle className="text-xl font-semibold ">
//                   Create New Task
//                 </DrawerTitle>
//                 <DrawerDescription className="text-sm text-slate-500">
//                   Once created, you can modify, delete, or undo the task at any
//                   time.
//                 </DrawerDescription>
//               </DrawerHeader>

//               <div className="p-4 pb-0">
//                 <Input
//                   value={newTask}
//                   onChange={(e) => setNewTask(e.target.value)}
//                   placeholder="Create New Task"
//                   className="w-full bg-white text-black placeholder:text-slate-500 border-slate-700 focus-visible:ring-slate-400"
//                 />
//               </div>

//               {/* Date and Time slots */}
//               <div className="mt-3  flex justify-center items-center ">
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant="outline"
//                       className=" border  border-slate-400 flex justify-between items-center"
//                     >
//                       {selectedDate ? format(selectedDate, "PPP") : ""}
//                       <CalendarIcon className="w-5 h-5" />
//                     </Button>
//                   </PopoverTrigger>
//                   {/* <PopoverContent align="start"> */}
//                     <Calendar
//                       mode="single"
//                       selected={selectedDate}
//                       onSelect={setSelectedDate}
//                       disabled={(date) =>
//                         isBefore(startOfDay(date), startOfDay(new Date()))
//                       }
//                     />
//                   {/* </PopoverContent> */}
//                 </Popover>

//                 {/* Time Slot Picker with Set Time Button */}
//                 <div className="flex justify-center items-center">
//                   <Popover>
//                     <PopoverTrigger asChild>
//                       <Button
//                         variant="outline"
//                         className="mx-auto flex  border  border-slate-400 justify-between items-center"
//                       >
//                         {selectedSlots.length === 2
//                           ? `${selectedSlots[0]} - ${selectedSlots[1]}`
//                           : ""}
//                         <ClockIcon className="w-5 h-5 content-center" />
//                       </Button>
//                     </PopoverTrigger>
//                     {/* <PopoverContent align="start"> */}
//                       <Test onSelect={handleSlotSelect} />
//                     {/* </PopoverContent> */}
//                   </Popover>
//                 </div>
//               </div>

//               {/* Show Selected Date & Time */}
//               {selectedDate && selectedSlots.length === 2 && (
//                 <p className="mt-4 flex justify-center items-center text-sm text-gray-600">
//                   Selected: {format(selectedDate, "PPP")} from{" "}
//                   {selectedSlots[0]} to {selectedSlots[1]}
//                 </p>
//               )}
//             </div>

//             <div className="mt-5">
//               <DrawerFooter className="px-4 pt-2">
//                 <div className="flex flex-col gap-3 w-full">
//                   <Button
//                     onClick={handleAddTask}
//                     className="w-full bg-slate-900 text-white hover:bg-slate-800"
//                   >
//                     Submit
//                   </Button>
//                   <DrawerClose asChild>
//                     <Button
//                       variant="outline"
//                       className="w-full border-slate-200 hover:bg-slate-100"
//                     >
//                       Cancel
//                     </Button>
//                   </DrawerClose>
//                 </div>
//               </DrawerFooter>
//             </div>
//           </DrawerContent>
//         </Drawer>
//       </div>
//     </div>
//   );
// };

// export default AddTask;

// *********************************************************************
import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addTodo } from "@/store/todoReducer";
import Test from "./Test";
import { Calendar } from "./ui/calendar";
import { format, isBefore, startOfDay } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";

const AddTask = () => {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);

  const resetSelections = () => {
    setNewTask("");
    setSelectedDate(null);
    setSelectedSlots([]);
    setShowCalendar(false);
    setShowTimeSlots(false);
  };

  const handleAddTask = () => {
    dispatch(addTodo({ title: newTask, completed: false }));
    resetSelections();
    setIsOpen(false);
  };

  const handleSlotSelect = (slots: string[]) => {
    setSelectedSlots(slots);
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 mt-6 right-0 bg-transparent shadow-lg flex justify-center">
      <div className="md:w-[35%] mx-auto py-2">
        <Drawer
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetSelections();
          }}
        >
          <DrawerTrigger asChild>
            <div className="relative cursor-pointer">
              <div className="flex items-center text-sm rounded-md w-full px-4 py-2 bg-slate-900 text-white md:rounded-full border border-slate-700 hover:border-slate-600 transition-colors">
                <div className="flex-1 text-slate-400 md:text-[16px]">
                  Create New Task
                </div>
                <kbd className="inline-flex h-6 items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2 font-mono text-sm font-medium text-slate-300">
                  <span className="text-xs">⌘ +</span>J
                </kbd>
              </div>
            </div>
          </DrawerTrigger>

          <DrawerContent className="mx-auto max-w-2xl justify-center flex items-center ">
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader className="text-center flex justify-center flex-col items-center">
                <DrawerTitle className="text-xl font-semibold ">
                  Create New Task
                </DrawerTitle>
                <DrawerDescription className="text-sm text-slate-500">
                  Once created, you can modify, delete, or undo the task at any
                  time.
                </DrawerDescription>
              </DrawerHeader>

              <div className="p-4 pb-0">
                <Input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Create New Task"
                  className="w-full bg-white text-black placeholder:text-slate-500 border-slate-700 focus-visible:ring-slate-400"
                />
              </div>

              <div className="mt-3 flex justify-between items-center">
                <Button
                  variant="outline"
                  className="border border-slate-400 flex justify-between items-center"
                  onClick={() => {
                    setShowCalendar((prev) => !prev);
                    setShowTimeSlots(false);
                  }}
                >
                  {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
                  <CalendarIcon className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border border-slate-400 flex justify-between items-center"
                  onClick={() => {
                    setShowTimeSlots((prev) => !prev);
                    setShowCalendar(false);
                  }}
                >
                  {selectedSlots.length === 2
                    ? `${selectedSlots[0]} - ${selectedSlots[1]}`
                    : "Set Time"}
                  <ClockIcon className="w-5 h-5" />
                </Button>
              </div>

              {showCalendar && (
                <div className="mt-2 flex justify-center items-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className=""
                    disabled={(date) =>
                      isBefore(startOfDay(date), startOfDay(new Date()))
                    }
                  />
                </div>
              )}

              {showTimeSlots && (
                <div className="mt-2">
                  <Test onSelect={handleSlotSelect} />
                </div>
              )}

              {selectedDate && selectedSlots.length === 2 && (
                <p className="mt-4 flex justify-center items-center text-sm text-gray-600">
                  Selected: {format(selectedDate, "PPP")} from{" "}
                  {selectedSlots[0]} to {selectedSlots[1]}
                </p>
              )}
            </div>

            <div className="mt-3">
              <DrawerFooter className="px-4 pt-2">
                <div className="flex  gap-3 w-full">
                  <Button
                    onClick={handleAddTask}
                    className="w-full bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Submit
                  </Button>
                  <DrawerClose asChild>
                    <Button
                      variant="outline"
                      className="w-full border-slate-200 hover:bg-slate-100"
                    >
                      Cancel
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default AddTask;
