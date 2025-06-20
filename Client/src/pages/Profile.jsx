import React, { useState } from 'react';
import PostFeed from '../components/PostFeed'; // Make sure you have this component

const Profile = ({ user, posts }) => {
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
          {['posts', 'media', 'liked'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-center ${
                activeTab === tab ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
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
                <img
                  key={post.id}
                  src={post.image}
                  alt="Media"
                  className="aspect-square object-cover rounded"
                />
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

export default Profile;
