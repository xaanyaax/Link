import React, { useState } from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Ref from './pages/Ref';
import Profile from './pages/Profile';
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
      {/* <Ref/> */}
      {/* <Profile /> */}
    </div>
  );
}

export default App;
