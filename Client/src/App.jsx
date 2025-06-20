import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import PostFeed from './components/PostFeed';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
function App() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div>
      <Routes>
        <Route path = "/" element={<Home />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
