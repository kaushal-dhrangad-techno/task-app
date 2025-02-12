// import { useState } from "react";

// const predefinedSlots = [
//   "08:00 AM",
//   "09:00 AM",
//   "10:00 AM",
//   "11:00 AM",
//   "12:00 PM",
//   "01:00 PM",
//   "02:00 PM",
//   "03:00 PM",
//   "04:00 PM",
//   "05:00 PM",
//   "06:00 PM",
// ];

// const DateTimePicker = ({
//   onSelect,
// }: {
//   onSelect: (slots: string[]) => void;
// }) => {
//   const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

//   const toggleSlot = (slot: string) => {
//     if (selectedSlots.includes(slot)) {
//       setSelectedSlots([]); // Deselect all
//       onSelect([]);
//     } else if (selectedSlots.length === 0) {
//       setSelectedSlots([slot]); // Select first slot
//     } else if (selectedSlots.length === 1) {
//       let updatedSlots = [selectedSlots[0], slot].sort(
//         (a, b) => predefinedSlots.indexOf(a) - predefinedSlots.indexOf(b)
//       );
//       setSelectedSlots(updatedSlots);
//       onSelect(updatedSlots);
//     } else {
//       console.log("Selected Slots:", slot);

//       setSelectedSlots([slot]); // Reset and start new selection
//     }
//   };

//   return (
//     <div className="grid grid-cols-4 gap-2 p-2">
//       {predefinedSlots.map((slot) => (
//         <button
//           key={slot}
//           className={`px-3 py-2 border rounded ${
//             selectedSlots.includes(slot)
//               ? "bg-slate-900 text-white"
//               : "bg-gray-200"
//           }`}
//           onClick={() => toggleSlot(slot)}
//         >
//           {slot}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default DateTimePicker;

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
      updatedSlots = []; // Deselect all
    } else if (selectedSlots.length === 0) {
      updatedSlots = [slot]; // Select first slot
    } else if (selectedSlots.length === 1) {
      updatedSlots = [selectedSlots[0], slot].sort(
        (a, b) => predefinedSlots.indexOf(a) - predefinedSlots.indexOf(b)
      );
    } else {
      updatedSlots = [slot]; // Reset selection
    }

    setSelectedSlots(updatedSlots);
    onSelect(updatedSlots); // Ensure parent component receives the update
  };

  return (
    <div className="grid grid-cols-4 gap-2 p-2">
      {predefinedSlots.map((slot) => (
        <button
          key={slot}
          className={`px-3 py-2 border rounded ${
            selectedSlots.includes(slot) ? "bg-slate-900 text-white" : "bg-gray-200"
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

