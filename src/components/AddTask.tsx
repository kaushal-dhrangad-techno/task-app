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

const Command = () => {
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleAddTask = () => {
    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });
    console.log("New todo:", newTodo);
    setNewTodo("");
    setIsOpen(false);
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
    <div className="w-[35%] mx-auto py-2">
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <div className="relative cursor-pointer">
            <div className="flex items-center w-full px-4 py-2 bg-slate-900 text-white rounded-full border border-slate-700 hover:border-slate-600 transition-colors">
              <div className="flex-1 text-slate-400">
                Press CTRL/⌘ J to Add New Task
              </div>
              <kbd className="inline-flex h-6 items-center gap-1 rounded border border-slate-700 bg-slate-800 px-2 font-mono text-sm font-medium text-slate-300">
                <span className="text-xs">Ctrl/⌘ +</span>J
              </kbd>
            </div>
          </div>
        </DrawerTrigger >

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
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Create New Task"
                className="w-full bg-white   text-black placeholder:text-slate-500 border-slate-700 focus-visible:ring-slate-400"
              />
            </div>

            <DrawerFooter className="px-4 pt-2">
              <div className="flex flex-col gap-3 w-full">
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
  );
};

export default Command;
