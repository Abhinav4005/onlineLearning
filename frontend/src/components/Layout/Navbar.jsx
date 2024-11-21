import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-lg font-bold">Online Learning Platform</a>
        <ul className="flex space-x-4">
          {token ? (
            <>
              <li>
                <Link to="/dashboard" className="hover:text-gray-200">Dashboard</Link>
              </li>
              <li>
                <Link to="/logout" className="hover:text-gray-200">Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-200">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-gray-200">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;