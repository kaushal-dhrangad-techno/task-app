import React, { useState } from "react";
import { motion } from "framer-motion";

const Test = () => {
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center justify-center space-x-3">
      {/* Checkbox */}
      <h1>Asdadsads</h1>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheck}
        className="w-5 h-5 cursor-pointer"
      />

      {/* Task Text with Animated Strikethrough */}
      <div className="relative text-lg font-medium">
        Example Task
        <motion.div
          className="absolute left-0 top-1/2 h-[2px] bg-black"
          initial={{ width: 0, right: "auto", left: 0 }}
          animate={
            checked
              ? { width: "100%", left: 0, right: "auto" } // Left to right
              : { width: 0, left: "auto", right: 0 } // Right to left when unchecked
          }
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Test;
