import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const predefinedSlots = [
  "05:00 AM",
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
  "09:00 PM",
];

const DateTimePicker = ({
  onSelect,
}: {
  onSelect: (slots: string[]) => void;
}) => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const toggleSlot = (slot: string) => {
    let updatedSlots = [...selectedSlots];

    if (selectedSlots.includes(slot)) {
      updatedSlots = [];
    } else if (selectedSlots.length === 0) {
      updatedSlots = [slot];
    } else if (selectedSlots.length === 1) {
      updatedSlots = [selectedSlots[0], slot].sort(
        (a, b) => predefinedSlots.indexOf(a) - predefinedSlots.indexOf(b)
      );
    } else {
      updatedSlots = [slot];
    }

    setSelectedSlots(updatedSlots);
    onSelect(updatedSlots);
  };

  const slotContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, staggerDirection: 1 }, // Appear one by one
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.1, staggerDirection: -1 }, // Disappear one by one
    },
  };
  
  const slotItemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: -10 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 10 } },
    exit: { opacity: 0, scale: 0.8, y: -10, transition: { duration: 0.2 } }, // Smooth fade out
  };
  return (
    <AnimatePresence>
      <motion.div
        className="grid grid-cols-4 gap-2 p-2"
        variants={slotContainerVariants}
        initial="hidden"
        animate="show"
        exit="hidden"
      >
        {predefinedSlots.map((slot) => (
          <motion.button
            variants={slotItemVariants}
            key={slot}
            className={`px-3 py-2 border rounded hover:bg-blue-500 hover:text-slate-200 ${
              selectedSlots.includes(slot)
                ? "bg-slate-900 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => toggleSlot(slot)}
          >
            {slot}
          </motion.button>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default DateTimePicker;
