import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg border-2 border-blue-500 text-center">
        <h1 className="text-4xl font-bold text-blue-400 mb-6">404 - Page Not Found</h1>
        <p className="text-lg text-gray-300 mb-6">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="block w-full text-center px-6 py-3 bg-blue-600 text-white rounded-md shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NoPage;
