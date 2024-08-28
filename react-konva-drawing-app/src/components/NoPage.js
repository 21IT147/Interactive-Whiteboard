import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">Sorry, the page you're looking for doesn't exist.</p>
      <Link 
        to="/" 
        className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition duration-200"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NoPage;
