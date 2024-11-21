import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Online Learning Platform. All Rights Reserved.
        </p>
        <ul className="flex justify-center space-x-4 mt-2">
          <li>
            <a href="/about" className="hover:text-gray-400">About</a>
          </li>
          <li>
            <a href="/contact" className="hover:text-gray-400">Contact</a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;