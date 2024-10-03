import React, { useState } from 'react';

const CustomToggle = ({ onToggle, label1 = "Transactions", label2 = "Loan" }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  return (
    <div 
      className={`relative w-[13.5rem] h-10 flex items-center ${isChecked ? 'bg-blue-500' : 'bg-gray-300'} rounded-full p-1 cursor-pointer`}
      onClick={handleToggle}
    >
      <div 
        className={`absolute w-[7rem] h-8 bg-white rounded-full shadow-md transform duration-300 ease-in-out ${isChecked ? 'translate-x-24' : ''}`}
      />
      <div className="flex justify-between w-full px-2 z-10">
        <span className={` font-medium ${isChecked ? 'text-white' : 'text-gray-900'}`}>
          {label1}
        </span>
        <span className={` font-medium ${isChecked ? 'text-gray-900' : 'text-white'}`}>
          {label2}
        </span>
      </div>
    </div>
  );
};

export default CustomToggle;