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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDispatch } from "react-redux";
import { useState } from "react";

const AddTask = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const handleAddTask = () => {
    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });
    console.log(newTodo);
    setNewTodo("");
  };
  return (
    // <div className="fixed z-50 justify-center items-center">
    <Drawer>
      {/* <div className="flex justify-center items-end  "> */}
      <DrawerTrigger className="text-white  capitalize px-4 py-2 w-[30%]   rounded-md ">
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Create New Task"
          className="mx-auto bg-black placeholder:text-white text-white w-full rounded-full"
        />
        {/* Create new task */}
      </DrawerTrigger>
      {/* </div> */}
      <DrawerContent className="w-1/2 mx-auto">
        <DrawerHeader className="flex flex-col justify-center items-center">
          <DrawerTitle>Create New Task</DrawerTitle>
          <DrawerDescription>
            Once created, you can modify, delete, or undo the task at any time.
          </DrawerDescription>
        </DrawerHeader>
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Create New Task"
          className="mx-auto w-1/2"
        />
        <DrawerFooter>
          {/* #0F172A */}
          {/* <div className="flex justify-center "> */}
          <Button className="w-3/2 mx-auto" onClick={handleAddTask}>
            Submit
          </Button>
          {/* </div> */}
          <DrawerClose>
            <div>
              <button>Cancel</button>
            </div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
    // </div>
  );
};

export default AddTask;
