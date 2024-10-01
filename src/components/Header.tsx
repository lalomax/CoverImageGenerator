import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          Cover Image Generator
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="text-white hover:text-gray-200">Home</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200">About</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-200">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;