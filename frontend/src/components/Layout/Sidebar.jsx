import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-100 w-64 h-full shadow-md">
      <nav className="p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/dashboard" 
              className="block py-2 px-3 rounded hover:bg-gray-200"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/courses" 
              className="block py-2 px-3 rounded hover:bg-gray-200"
            >
              My Courses
            </Link>
          </li>
          <li>
            <Link 
              to="/quizzes" 
              className="block py-2 px-3 rounded hover:bg-gray-200"
            >
              Quizzes
            </Link>
          </li>
          <li>
            <Link 
              to="/assignments" 
              className="block py-2 px-3 rounded hover:bg-gray-200"
            >
              Assignments
            </Link>
          </li>
          <li>
            <Link 
              to="/profile" 
              className="block py-2 px-3 rounded hover:bg-gray-200"
            >
              Profile
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;