import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PostFeed from './components/PostFeed';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
function App() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    // <div className={`${isDark ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'} min-h-screen flex`}>
    //   <Sidebar isDark={isDark} />

    //   <div className="flex-1">
    //     <Navbar isDark={isDark} toggleTheme={toggleTheme} />
    //     <PostFeed isDark={isDark} />
    //   </div>
    // </div>
    <div>
      {/* <Login /> */}
      <SignUp />

    </div>
  );
}

export default App;
