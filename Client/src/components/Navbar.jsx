import React from 'react';
import { FaHome, FaBell, FaEnvelope } from 'react-icons/fa';

const Navbar = ({ isDark, toggleTheme }) => {
  return (
    <nav className={`w-full ${isDark ? 'bg-gray-900' : 'bg-white'} text-${isDark ? 'white' : 'black'} px-6 py-3 flex items-center justify-between shadow-md`}>
      {/* Website Name */}
      <div className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>LinkUP</div>

      {/* Search Bar */}
      <div className="flex-1 mx-6 max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className={`w-full px-4 py-2 rounded-full ${isDark ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'} focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-blue-500' : 'focus:ring-blue-300'}`}
        />
      </div>

      {/* Icons and Toggle */}
      <div className="flex items-center gap-5 text-xl">
        {/* Light/Dark toggle */}
        <button
          onClick={toggleTheme}
          className="text-2xl hover:text-blue-400 transition"
          title="Toggle Theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        <FaHome className="cursor-pointer hover:text-blue-400" />
        <FaEnvelope className="cursor-pointer hover:text-blue-400" />
        <FaBell className="cursor-pointer hover:text-blue-400" />

        {/* Placeholder for user */}
        <div className={`w-9 h-9 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-300'} border-2 ${isDark ? 'border-blue-500' : 'border-blue-400'} flex items-center justify-center cursor-pointer`}>
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>U</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
