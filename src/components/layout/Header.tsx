import React, { useState } from "react";
import { Link } from "react-router-dom";
import { menuItems } from "../../utils/constants";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[rgb(59,67,74)] text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="flex items-center">
          <div className="w-10 h-10">
            <img src="/news_mosaic.svg" alt="News Mosaic Logo" />
          </div>
          <span className="ml-2 text-lg font-semibold"> News Mosaic</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="hover:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            className="w-6 h-6"
          >
            <path d="M20 4H0V2h20z" />
            <path d="M20 11H0V9h20z" />
            <path d="M20 18H0v-2h20z" />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden bg-[rgb(59,67,74)] p-4 absolute top-full left-0 right-0 shadow-md">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.link}
              className="block py-2 hover:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
