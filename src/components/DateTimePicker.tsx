import { useState } from "react";

const predefinedSlots = [
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

  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {predefinedSlots.map((slot) => (
        <button
          key={slot}
          className={`px-3 py-2 border rounded hover:bg-blue-500 hover:text-slate-200 ${
            selectedSlots.includes(slot)
              ? "bg-slate-900 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => toggleSlot(slot)}
        >
          {slot}
        </button>
      ))}
    </div>
  );
};

export default DateTimePicker;
