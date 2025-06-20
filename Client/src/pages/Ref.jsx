import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: 'John Doe',
    username: '@johndoe',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    followers: 1234,
    following: 567
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: { name: 'Jane Smith', username: '@janesmith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
      content: 'Just finished building an amazing React app! 🚀',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop',
      likes: 45,
      comments: 12,
      shares: 5,
      timestamp: '2h ago',
      liked: false
    },
    {
      id: 2,
      user: { name: 'Alex Johnson', username: '@alexj', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
      content: 'Beautiful sunset today! Nature never fails to amaze me 🌅',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      likes: 128,
      comments: 23,
      shares: 8,
      timestamp: '4h ago',
      liked: true
    },
    {
      id: 3,
      user: { name: 'Sarah Wilson', username: '@sarahw', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
      content: 'Coffee and code - the perfect combination for a productive morning ☕💻',
      likes: 89,
      comments: 15,
      shares: 3,
      timestamp: '6h ago',
      liked: false
    }
  ]);

  const [stories, setStories] = useState([
    { id: 1, user: { name: 'You', avatar: currentUser.avatar }, hasStory: false, isAdd: true },
    { id: 2, user: { name: 'Mike', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' }, hasStory: true },
    { id: 3, user: { name: 'Emma', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face' }, hasStory: true },
    { id: 4, user: { name: 'Chris', avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=150&h=150&fit=crop&crop=face' }, hasStory: true }
  ]);

  const [suggestions] = useState([
    { id: 1, name: 'Tech News', username: '@technews', avatar: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=150&h=150&fit=crop', followers: '2.5M' },
    { id: 2, name: 'Design Hub', username: '@designhub', avatar: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=150&h=150&fit=crop', followers: '1.8M' },
    { id: 3, name: 'Coding Tips', username: '@codingtips', avatar: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=150&h=150&fit=crop', followers: '890K' }
  ]);

  const [notifications] = useState([
    { id: 1, type: 'like', user: 'Jane Smith', action: 'liked your post', time: '5m ago' },
    { id: 2, type: 'comment', user: 'Alex Johnson', action: 'commented on your post', time: '1h ago' },
    { id: 3, type: 'follow', user: 'Sarah Wilson', action: 'started following you', time: '2h ago' }
  ]);

  const [messages] = useState([
    { id: 1, user: { name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' }, lastMessage: 'Hey! How are you doing?', time: '2m ago', unread: true },
    { id: 2, user: { name: 'Alex Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }, lastMessage: 'Thanks for the help!', time: '1h ago', unread: false },
    { id: 3, user: { name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' }, lastMessage: 'See you tomorrow!', time: '3h ago', unread: false }
  ]);

  const [currentView, setCurrentView] = useState('home');
  const [newPost, setNewPost] = useState('');
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: currentUser,
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'now',
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowCreatePost(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />
      
      <div className="flex">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        
        <main className="flex-1 max-w-2xl mx-auto">
          {currentView === 'home' && (
            <HomeFeed 
              posts={posts}
              stories={stories}
              onLike={handleLike}
              showCreatePost={showCreatePost}
              setShowCreatePost={setShowCreatePost}
              newPost={newPost}
              setNewPost={setNewPost}
              onCreatePost={handleCreatePost}
              currentUser={currentUser}
            />
          )}
          {currentView === 'explore' && <ExplorePage />}
          {currentView === 'notifications' && <NotificationsPage notifications={notifications} />}
          {currentView === 'messages' && <MessagesPage messages={messages} />}
          {currentView === 'profile' && <ProfilePage user={currentUser} posts={posts.filter(p => p.user.name === currentUser.name)} />}
        </main>
        
        <RightSidebar suggestions={suggestions} />
      </div>
    </div>
  );
};

// Navbar Component
const Navbar = ({ currentView, setCurrentView }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-blue-400">SocialApp</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-700 text-white px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute right-3 top-2.5 text-gray-400">
              🔍
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <button className="hover:text-blue-400 transition-colors">🏠</button>
          <button className="hover:text-blue-400 transition-colors">📧</button>
          <button className="hover:text-blue-400 transition-colors">🔔</button>
          <div className="w-8 h-8 rounded-full bg-gray-600 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </nav>
  );
};

// Sidebar Component
const Sidebar = ({ currentView, setCurrentView }) => {
  const menuItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'explore', icon: '🔍', label: 'Explore' },
    { id: 'notifications', icon: '🔔', label: 'Notifications' },
    { id: 'messages', icon: '📧', label: 'Messages' },
    { id: 'profile', icon: '👤', label: 'Profile' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <div className="w-64 bg-gray-800 min-h-screen p-4 hidden lg:block">
      <div className="space-y-2">
        {menuItems.map(item => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors ${
              currentView === item.id ? 'bg-gray-700 text-blue-400' : 'text-gray-300'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// Right Sidebar Component
const RightSidebar = ({ suggestions }) => {
  return (
    <div className="w-80 bg-gray-800 min-h-screen p-4 hidden xl:block">
      <div className="space-y-6">
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="font-bold text-lg mb-4">Trending</h3>
          <div className="space-y-3">
            <div className="hover:bg-gray-600 p-2 rounded cursor-pointer">
              <p className="text-sm text-gray-400">Trending in Technology</p>
              <p className="font-semibold">#ReactJS</p>
              <p className="text-sm text-gray-400">24.5K posts</p>
            </div>
            <div className="hover:bg-gray-600 p-2 rounded cursor-pointer">
              <p className="text-sm text-gray-400">Trending</p>
              <p className="font-semibold">#WebDevelopment</p>
              <p className="text-sm text-gray-400">18.2K posts</p>
            </div>
            <div className="hover:bg-gray-600 p-2 rounded cursor-pointer">
              <p className="text-sm text-gray-400">Trending in Design</p>
              <p className="font-semibold">#UIDesign</p>
              <p className="text-sm text-gray-400">12.8K posts</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="font-bold text-lg mb-4">Suggested for you</h3>
          <div className="space-y-3">
            {suggestions.map(suggestion => (
              <div key={suggestion.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={suggestion.avatar} alt={suggestion.name} className="w-10 h-10 rounded-full" />
                  <div>
                    <p className="font-semibold">{suggestion.name}</p>
                    <p className="text-sm text-gray-400">{suggestion.followers} followers</p>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm font-medium">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stories Component
const Stories = ({ stories }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto">
        {stories.map(story => (
          <div key={story.id} className="flex-shrink-0 text-center">
            <div className={`w-16 h-16 rounded-full p-0.5 ${story.hasStory ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-600'}`}>
              <div className="w-full h-full rounded-full bg-gray-800 p-0.5">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <img src={story.user.avatar} alt={story.user.name} className="w-full h-full object-cover" />
                  {story.isAdd && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">+</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs mt-1 text-gray-300 truncate w-16">{story.user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Create Post Component
const CreatePost = ({ showCreatePost, setShowCreatePost, newPost, setNewPost, onCreatePost, currentUser }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex space-x-3">
        <img src={currentUser.avatar} alt="Your avatar" className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <button
            onClick={() => setShowCreatePost(true)}
            className="w-full text-left p-3 bg-gray-700 rounded-full text-gray-400 hover:bg-gray-600 transition-colors"
          >
            What's on your mind?
          </button>
        </div>
      </div>
      
      {showCreatePost && (
        <div className="mt-4 space-y-3">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-gray-700 text-white p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button className="text-blue-400 hover:text-blue-300">📷 Photo</button>
              <button className="text-green-400 hover:text-green-300">🎥 Video</button>
              <button className="text-yellow-400 hover:text-yellow-300">😊 Emoji</button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowCreatePost(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onCreatePost}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Post Component
const Post = ({ post, onLike }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState('');

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-3 mb-3">
        <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full" />
        <div>
          <p className="font-semibold">{post.user.name}</p>
          <p className="text-sm text-gray-400">{post.user.username} • {post.timestamp}</p>
        </div>
        <div className="ml-auto">
          <button className="text-gray-400 hover:text-white">⋯</button>
        </div>
      </div>
      
      <p className="mb-3">{post.content}</p>
      
      {post.image && (
        <img src={post.image} alt="Post content" className="w-full rounded-lg mb-3" />
      )}
      
      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center space-x-2 hover:text-red-400 transition-colors ${post.liked ? 'text-red-400' : 'text-gray-400'}`}
        >
          <span>❤️</span>
          <span>{post.likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
        >
          <span>💬</span>
          <span>{post.comments}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors">
          <span>🔄</span>
          <span>{post.shares}</span>
        </button>
        <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors">
          <span>📤</span>
        </button>
      </div>
      
      {showComments && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex space-x-3 mb-3">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="Your avatar" className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex space-x-3">
              <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face" alt="Commenter" className="w-8 h-8 rounded-full" />
              <div className="flex-1 bg-gray-700 rounded-lg p-3">
                <p className="font-semibold text-sm">Jane Smith</p>
                <p className="text-sm">Great post! Really inspiring 🔥</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Home Feed Component
const HomeFeed = ({ posts, stories, onLike, showCreatePost, setShowCreatePost, newPost, setNewPost, onCreatePost, currentUser }) => {
  return (
    <div className="p-4">
      <Stories stories={stories} />
      <CreatePost 
        showCreatePost={showCreatePost}
        setShowCreatePost={setShowCreatePost}
        newPost={newPost}
        setNewPost={setNewPost}
        onCreatePost={onCreatePost}
        currentUser={currentUser}
      />
      <div className="space-y-4">
        {posts.map(post => (
          <Post key={post.id} post={post} onLike={onLike} />
        ))}
      </div>
    </div>
  );
};

// Explore Page Component
const ExplorePage = () => {
  const exploreCategories = ['For You', 'Trending', 'Technology', 'Design', 'Photography', 'Travel'];
  const [activeCategory, setActiveCategory] = useState('For You');

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Explore</h2>
        <div className="flex space-x-2 overflow-x-auto">
          {exploreCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                activeCategory === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
            <img 
              src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=400&h=300&fit=crop`} 
              alt="Explore content" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold mb-2">Trending Topic #{i + 1}</h3>
              <p className="text-gray-400 text-sm">125K posts • Trending</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Notifications Page Component
const NotificationsPage = ({ notifications }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      <div className="space-y-4">
        {notifications.map(notification => (
          <div key={notification.id} className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p>
                <span className="font-semibold">{notification.user}</span> {notification.action}
              </p>
              <p className="text-sm text-gray-400">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Messages Page Component
const MessagesPage = ({ messages }) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      <div className="space-y-4">
        {messages.map(message => (
          <div key={message.id} className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3 hover:bg-gray-700 cursor-pointer">
            <img src={message.user.avatar} alt={message.user.name} className="w-12 h-12 rounded-full" />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{message.user.name}</p>
                <p className="text-sm text-gray-400">{message.time}</p>
              </div>
              <p className="text-gray-400">{message.lastMessage}</p>
            </div>
            {message.unread && <div className="w-3 h-3 bg-blue-500 rounded-full"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

// Profile Page Component
const ProfilePage = ({ user, posts }) => {
  const [activeTab, setActiveTab] = useState('posts');
  
  return (
    <div className="p-4">
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-6">
          <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
          <div className="flex-1">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-400">{user.username}</p>
            <div className="flex space-x-6 mt-4">
              <div className="text-center">
                <p className="font-bold text-lg">{posts.length}</p>
                <p className="text-gray-400 text-sm">Posts</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{user.followers}</p>
                <p className="text-gray-400 text-sm">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">{user.following}</p>
                <p className="text-gray-400 text-sm">Following</p>
              </div>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium">
            Edit Profile
          </button>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg">
        <div className="flex border-b border-gray-700">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'posts' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'media' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'
            }`}
          >
            Media
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex-1 py-3 px-4 text-center ${
              activeTab === 'liked' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'
            }`}
          >
            Liked
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === 'posts' && (
            <div className="space-y-4">
              {posts.map(post => (
                <Post key={post.id} post={post} onLike={() => {}} />
              ))}
            </div>
          )}
          {activeTab === 'media' && (
            <div className="grid grid-cols-3 gap-2">
              {posts.filter(p => p.image).map(post => (
                <img key={post.id} src={post.image} alt="Media" className="aspect-square object-cover rounded" />
              ))}
            </div>
          )}
          {activeTab === 'liked' && (
            <div className="text-center py-8 text-gray-400">
              <p>Liked posts will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;