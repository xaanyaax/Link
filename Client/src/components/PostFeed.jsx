import React from 'react';

const posts = [
  {
    id: 1,
    username: 'john_doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    content: 'Excited to join LinkUP! Loving the dark theme here 🔥',
    time: '2h ago',
  },
  {
    id: 2,
    username: 'jane_smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    content: 'Just posted my first update 🚀',
    time: '30m ago',
  },
];

const PostFeed = ({ isDark }) => {
  return (
    <div className="p-6 space-y-6">
      {posts.map((post) => (
        <div
          key={post.id}
          className={`p-4 rounded-xl shadow transition 
            ${isDark ? 'bg-gray-800 hover:shadow-lg' : 'bg-white hover:shadow-md border'}`}
        >
          <div className="flex items-start gap-4">
            <img src={post.avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <div className={`flex justify-between items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>@{post.username}</span>
                <span>{post.time}</span>
              </div>
              <p className={`mt-2 ${isDark ? 'text-white' : 'text-black'}`}>{post.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
