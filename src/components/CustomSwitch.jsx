import React, { useState } from 'react';

const CustomToggle = ({ onToggle, label1, label2 }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
    onToggle(!isChecked);
  };

  return (
    <div className="flex items-center space-x-2">
      <div 
        className={`relative w-14 h-7 flex items-center ${isChecked ? 'bg-blue-500' : 'bg-gray-300'} rounded-full p-1 cursor-pointer`}
        onClick={handleToggle}
      >
        <div 
          className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${isChecked ? 'translate-x-7' : ''}`}
        />
      </div>
      <span className="text-sm font-medium text-gray-900">
        {isChecked ? label2 : label1}
      </span>
    </div>
  );
};

export default CustomToggle;