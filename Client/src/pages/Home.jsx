import React , {useState} from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import PostFeed from '../components/PostFeed'



function Home() {

  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);
  
  return (
    <div className={`${isDark ? 'bg-gray-950 text-white' : 'bg-gray-100 text-black'} min-h-screen flex`}>
      <Sidebar isDark={isDark} />

      <div className="flex-1">
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <PostFeed isDark={isDark} />
      </div>
    </div>
  )
}

export default Home
