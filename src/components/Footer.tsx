import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg text-white py-6">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p>&copy; {new Date().getFullYear()} Cover Image Generator. All rights reserved.</p>
        </div>
        <nav>
          <ul className="flex space-x-6 justify-center md:justify-end">
            <li>
              <a href="#" className="hover:text-gray-400">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-400">Contact Us</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;