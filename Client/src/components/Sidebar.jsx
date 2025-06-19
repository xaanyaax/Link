import React from 'react';

const navItems = [
  { icon: '🏠', label: 'Home' },
  { icon: '🔍', label: 'Explore' },
  { icon: '🔔', label: 'Notifications' },
  { icon: '📧', label: 'Messages' },
  { icon: '👤', label: 'Profile' },
  { icon: '⚙️', label: 'Settings' },
];

const Sidebar = ({ isDark }) => {
  return (
    <aside className={`w-60 min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'} py-8 px-4 shadow-lg`}>
      <nav className="flex flex-col gap-6">
        {navItems.map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-4 text-lg px-3 py-2 rounded-md cursor-pointer transition-all 
              ${isDark ? 'hover:bg-gray-800 hover:text-blue-400' : 'hover:bg-gray-200 hover:text-blue-600'}`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
