import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg border-2 border-blue-500">
        <h1 className="text-4xl font-bold text-blue-400 mb-8 text-center">Welcome to the Whiteboard App</h1>
        <div className="space-y-4">
          <Link
            to="/whiteboard"
            className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
          >
            Go to Whiteboard
          </Link>

          <Link
            to="/create-room"
            className="block w-full text-center px-6 py-3 bg-green-600 text-white rounded-md shadow-lg hover:bg-green-700 transition duration-300"
          >
            Create Room
          </Link>

          <Link
            to="/join-room"
            className="block w-full text-center px-6 py-3 bg-purple-600 text-white rounded-md shadow-lg hover:bg-purple-700 transition duration-300"
          >
            Join Room
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
