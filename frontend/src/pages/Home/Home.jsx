import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">Welcome to Our Platform</h1>
        <div className="space-y- flex gap-4">
          <NavLink
            to="/signup"
            className="w-48 py-3 px-6 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </NavLink>

          <NavLink
            to="/login"
            className="w-48 py-3 px-6 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;