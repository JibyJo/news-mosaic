import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
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
          <a href="/en/africa/s-12756" className="hover:text-gray-300">
            Africa
          </a>
          <a href="/en/asia/s-12758" className="hover:text-gray-300">
            Asia
          </a>
          <a href="/en/europe/s-1433" className="hover:text-gray-300">
            Europe
          </a>
          <a href="/en/middle-east/s-14207" className="hover:text-gray-300">
            Middle East
          </a>
          <a
            href="/en/north-america/s-58267502"
            className="hover:text-gray-300"
          >
            North America
          </a>
        </nav>

        <button
          className="md:hidden text-white focus:outline-none"
          aria-label="Open menu"
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
    </header>
  );
};

export default Header;
