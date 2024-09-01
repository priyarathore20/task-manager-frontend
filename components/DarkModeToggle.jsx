'use client';
import React, { useState } from 'react';
import { IoMoonOutline, IoSunnyOutline } from 'react-icons/io5';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      var element = document.getElementById('html-tag');
      if (element) {
        element.classList.add('dark');
      }
    } else {
      var element2 = document.getElementById('html-tag');
      if (element2) {
        element2.classList.remove('dark');
      }
    }
    setIsDarkMode((prevMode) => !prevMode);
    // Optionally, you can save the user's preference to localStorage or a global state management solution
  };

  return (
    <div>
      <button onClick={toggleDarkMode}>
        {!isDarkMode ? (
          <IoSunnyOutline className="w-6 h-6 text-gray-500 dark:text-formHeading" />
        ) : (
          <IoMoonOutline className="w-6 h-6 text-gray-500 dark:text-formHeading translate-y-1" />
        )}
      </button>
      {/* Apply dark mode styles conditionally */}
    </div>
  );
};

export default DarkModeToggle;
