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
import { RootState } from "./Task";
import { addTodo, addCategory, CategoryProps } from "@/store/todoReducer";
import { Calendar } from "./ui/calendar";
import { format, isBefore, startOfDay } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";
import DateTimePicker from "./DateTimePicker";
import { Badge } from "./ui/badge";
// import EmojiPicker from "emoji-picker-react";
import EmojiPicker from "emoji-picker-react";
import { ScrollArea } from "./ui/scroll-area";
import { motion } from "motion/react";

const AddTask = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.todos.categories);

  const [newTask, setNewTask] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showTimeSlots, setShowTimeSlots] = useState<boolean>(false);
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectEmoji, setSelectEmoji] = useState<string>("");

  const resetSelections = () => {
    setNewTask("");
    setSelectedDate(null);
    setSelectedSlots([]);
    setShowCalendar(false);
    setShowTimeSlots(false);
    setShowCategory(false);
    setSelectedCategories([]);
    setSelectEmoji("");
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
    if (!newCategory.trim()) {
      alert("Category name cannot be empty!");
      return;
    }

    if (!selectEmoji.trim()) {
      alert("Please select an emoji for the category! 😊");
      return;
    }

    if (categories.some((cat) => cat.title === newCategory)) {
      alert("This category already exists!");
      return;
    }

    dispatch(addCategory({ title: newCategory, emoji: selectEmoji })); 
    setSelectedCategories([...selectedCategories, newCategory]); 
    setNewCategory("");
    setSelectEmoji(""); 
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(
      (prev) => (prev.includes(category) ? [] : [category]) // Deselect if already selected, otherwise select
    );
  };

  const onEmojiClick = (emojiObject: any) => {
    setSelectEmoji(emojiObject.emoji); 
    setShowEmojiPicker(false); 
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

  // Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.5 }, //0.5
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    // <ScrollArea>
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="fixed bottom-0 left-0 mt-6 right-0 bg-transparent shadow-lg flex justify-center"
    >
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

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="pb-0"
              >
                <motion.div
                  variants={itemVariants}
                  className="flex justify-center items-center gap-2 "
                >
                  <Input
                    value={newTask}
                    autoFocus
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Create New Task"
                    className="w-full mr-1 bg-white text-black placeholder:text-slate-500 border-slate-700 focus-visible:ring-slate-400"
                  />
                  <Button
                    // variant="outline"
                    variant={showCalendar ? "default" : "secondary"}
                    onClick={() => {
                      setShowCalendar((prev) => !prev);
                      setShowTimeSlots(false);
                      setShowCategory(false);
                      setShowEmojiPicker(false);
                    }}
                    className="px-5 py-4"
                  >
                    {selectedDate ? format(selectedDate, "PPP") : ""}
                    <CalendarIcon className="w-5 h-5" />
                  </Button>
                </motion.div>

                {/* Category Selection */}
                <motion.div variants={itemVariants} className="category">
                  <div className="flex gap-2 mt-3">
                    {/* Emoji Selection */}
                    <Input
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      onClick={() => {
                        setShowCategory((prev) => !prev);
                        setShowTimeSlots(false);
                        setShowCalendar(false);
                        setShowEmojiPicker(false);
                      }}
                      placeholder="Add new category with emoji"
                    />
                    <Button
                      // variant="secondary"
                      variant={showEmojiPicker ? "default" : "secondary"}
                      onClick={() => {
                        setShowEmojiPicker(!showEmojiPicker);
                        setShowCalendar(false);
                        setShowCategory(false);
                        setShowTimeSlots(false);
                      }}
                    >
                      {selectEmoji || (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="3"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-smile"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" x2="9.01" y1="9" y2="9" />
                          <line x1="15" x2="15.01" y1="9" y2="9" />
                        </svg>
                      )}
                    </Button>
                    <Button onClick={handleAddCategory}>Add</Button>
                  </div>

                  <div className="mt-3">
                    <ScrollArea className="w-full">
                      <div className="max-h-[30vh] overflow-auto">
                        {/* <h2 className="text-lg font-medium">Select Categories</h2> */}
                        {categories.length === 0 ? (
                          <p className="mt-2 text-slate-700 flex justify-center">
                            No categories are available
                          </p>
                        ) : (
                          showCategory && (
                            <motion.div
                              variants={itemVariants}
                              className="flex flex-col gap-2 mt-2"
                            >
                              <h2 className="text-lg font-medium">
                                Select Categories
                              </h2>
                              {categories.map(
                                (category: CategoryProps, index: number) => (
                                  <Badge
                                    key={index}
                                    onClick={() =>
                                      handleCategoryClick(category.title)
                                    }
                                    className={`cursor-pointer px-3 py-1 hover:bg-blue-600 hover:text-slate-200 text-[0.9rem] transition-all ${
                                      selectedCategories.includes(
                                        category.title
                                      )
                                        ? "bg-slate-900 text-white"
                                        : "bg-gray-200 text-gray-700"
                                    }`}
                                  >
                                    {category.emoji} {category.title}
                                  </Badge>
                                )
                              )}
                            </motion.div>
                          )
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </motion.div>
              </motion.div>

              {/* Calendar & Time Slots */}
              <div className="flex justify-center items-center w-full">
                {showCalendar && (
                  <motion.div variants={itemVariants} className="">
                    {/* <h2 className="text-lg flex justify-start font-medium">
                      Select Date
                    </h2> */}
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className=""
                      disabled={(date) =>
                        isBefore(startOfDay(date), startOfDay(new Date()))
                      }
                    />
                  </motion.div>
                )}
              </div>
              <div>
                {showEmojiPicker && (
                  <motion.div
                    variants={itemVariants}
                    className="mt-2 flex justify-center items-center"
                  >
                    <EmojiPicker
                      height={300}
                      className="text-sm"
                      // searchDisabled
                      lazyLoadEmojis={true}
                      previewConfig={{ showPreview: false }}
                      size={5}
                      preload
                      onEmojiClick={onEmojiClick}
                    />
                  </motion.div>
                )}
                {showTimeSlots && (
                  <DateTimePicker onSelect={handleSlotSelect} />
                )}
              </div>
            </div>

            <DrawerFooter className="px-4 pt-2 mt-2 w-[80%] mx-auto">
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
    </motion.div>
  );
};

export default AddTask;
