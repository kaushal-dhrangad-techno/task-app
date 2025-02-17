import { useEffect, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./Task"; // Import RootState type
import { addTodo, addCategory, CategoryProps } from "@/store/todoReducer";
import { Calendar } from "./ui/calendar";
import { format, isBefore, startOfDay } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import DateTimePicker from "./DateTimePicker";
import { Badge } from "./ui/badge";
import EmojiPicker from "emoji-picker-react"; // Import emoji picker
import { ScrollArea } from "@radix-ui/react-scroll-area";

const AddTask = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.todos.categories);

  const [newTask, setNewTask] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showTimeSlots, setShowTimeSlots] = useState<boolean>(false);
  const [showCategory, setShowCategory] = useState<boolean>(true);
  const [newCategory, setNewCategory] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectEmoji, setSelectEmoji] = useState<string>(""); // Store emoji for new category
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const resetSelections = () => {
    setNewTask("");
    setSelectedDate(null);
    setSelectedSlots([]);
    setShowCalendar(false);
    setShowTimeSlots(false);
    setShowCategory(false);
    setSelectedCategories([]);
    setSelectEmoji(""); // Reset emoji selection
  };

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(
        addTodo({
          id: Date.now().toString(),
          title: newTask,
          completed: false,
          selectedDate: selectedDate ? format(selectedDate, "PPP") : undefined,
          selectedTimeSlots:
            selectedSlots.length === 2
              ? `${selectedSlots[0]} - ${selectedSlots[1]}`
              : "Time is not provided",
          category:
            selectedCategories.length > 0
              ? selectedCategories.map((cat) => ({
                  title: cat,
                  emoji: selectEmoji,
                })) // Attach emoji to category
              : [], // Store only one category with emoji
          selectedEmoji: selectEmoji, // Store emoji for the task
        })
      );
    }
    resetSelections();
    setIsOpen(false);
  };

  const handleSlotSelect = (slots: string[]) => {
    setSelectedSlots(slots);
  };

  const handleAddCategory = () => {
    if (
      newCategory.trim() &&
      !categories.some((cat) => cat.title === newCategory)
    ) {
      dispatch(addCategory({ title: newCategory, emoji: selectEmoji })); // Add category with emoji to Redux store
      setSelectedCategories([...selectedCategories, newCategory]); // Select the new category
      setNewCategory("");
      setSelectEmoji(""); // Reset emoji after category creation
    }
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(
      (prev) => (prev.includes(category) ? [] : [category]) // Deselect if already selected, otherwise select
    );
  };

  const onEmojiClick = (emojiObject: any) => {
    setSelectEmoji(emojiObject.emoji); // Set the selected emoji
    setShowEmojiPicker(false); // Close emoji picker
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
    // <ScrollArea>
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

          <DrawerContent className="mx-auto max-w-2xl justify-center flex items-center">
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

              <div className="pb-0">
                <Input
                  value={newTask}
                  autoFocus
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Create New Task"
                  className="w-full bg-white text-black placeholder:text-slate-500 border-slate-700 focus-visible:ring-slate-400"
                />

                {/* Category Selection */}
                <div className="category">
                  <div className="flex gap-2 mt-3">
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onClick={() => {
                        setShowCategory((prev) => !prev);
                        setShowTimeSlots(false);
                        setShowCalendar(false);
                        setShowEmojiPicker(false);
                      }}
                      placeholder="Add new category"
                    />
                    <Button onClick={handleAddCategory}>Add</Button>
                  </div>

                  {/* Emoji Selection */}
                  <div>
                    <Button
                      onClick={() => {
                        setShowEmojiPicker(!showEmojiPicker);
                        setShowCalendar(false);
                        setShowCategory(false);
                        setShowTimeSlots(false);
                      }}
                    >
                      {selectEmoji || "Select Emoji"}
                    </Button>
                    {/* {showEmojiPicker && (
                      <div className="mt-2 h-50">
                        <EmojiPicker onEmojiClick={onEmojiClick} />
                      </div>
                    )} */}
                  </div>

                  <div className="mt-3">
                    <h2 className="text-lg font-medium">Select Categories</h2>
                    {showCategory && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {categories.map(
                          (category: CategoryProps, index: number) => (
                            <Badge
                              key={index}
                              onClick={() =>
                                handleCategoryClick(category.title)
                              }
                              className={`cursor-pointer px-3 py-1 hover:bg-blue-600 hover:text-slate-200 transition-all ${
                                selectedCategories.includes(category.title)
                                  ? "bg-slate-900 text-white"
                                  : "bg-gray-200 text-gray-700"
                              }`}
                            >
                              {category.emoji} {category.title}
                            </Badge>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Calendar & Time Slots */}
              <div className="mt-3 flex mx-auto justify-between items-center">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCalendar((prev) => !prev);
                    setShowTimeSlots(false);
                    setShowCategory(false);
                  }}
                >
                  {selectedDate ? format(selectedDate, "PPP") : "Select Date"}
                  <CalendarIcon className="w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowTimeSlots((prev) => !prev);
                    setShowCalendar(false);
                    setShowCategory(false);
                    setShowEmojiPicker(false);
                  }}
                >
                  {selectedSlots.length === 2
                    ? `${selectedSlots[0]} - ${selectedSlots[1]}`
                    : "Set Time"}
                  <ClockIcon className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex justify-center items-center">
                {showCalendar && (
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className=""
                    disabled={(date) =>
                      isBefore(startOfDay(date), startOfDay(new Date()))
                    }
                  />
                )}
              </div>
              <div>
                {showEmojiPicker && (
                  <div className="mt-2 flex justify-center items-center">
                    <EmojiPicker
                      height={300}
                      searchDisabled
                      onEmojiClick={onEmojiClick}
                    />
                  </div>
                )}
                {showTimeSlots && (
                  <DateTimePicker onSelect={handleSlotSelect} />
                )}
              </div>
            </div>

            <DrawerFooter className="px-4 pt-2">
              <Button
                onClick={handleAddTask}
                disabled={!newTask.trim()}
                className="w-full"
              >
                Add Task
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default AddTask;
