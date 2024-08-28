import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Whiteboard App</h1>
      <div className="space-y-4">
        <Link 
          to="/whiteboard" 
          className="px-6 py-3 bg-blue-500 text-white rounded shadow-lg hover:bg-blue-600 transition duration-200"
        >
          Go to Whiteboard
        </Link>
       
        <Link 
          to="/room-management" 
          className="px-6 py-3 bg-purple-500 text-white rounded shadow-lg hover:bg-purple-600 transition duration-200"
        >
          Room Management
        </Link>
      </div>
    </div>
  );
};

export default Home;
