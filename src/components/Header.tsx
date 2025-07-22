"use client";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-2 border-gray-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Main header */}
        <div className="text-center mb-6">
          <Link href="/" className="group">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-gray-900 mb-2 tracking-wider group-hover:text-gray-700 transition-colors duration-300">
              RAMZI BLOG
            </h1>
            <div className="w-24 h-px bg-gray-900 mx-auto mb-3"></div>
            <p className="text-sm font-serif text-gray-600 uppercase tracking-[0.2em]">
              Thoughts • Ideas • Stories
            </p>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="block md:hidden border-t border-gray-200 pt-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex items-center justify-center p-3 text-gray-700 hover:text-gray-900 transition-all duration-200 hover:bg-gray-50 rounded-lg group"
          >
            <span className="text-sm font-serif uppercase tracking-widest mr-2 group-hover:tracking-wider transition-all duration-200">
              Menu
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-all duration-300 ease-in-out ${
                isMenuOpen ? "transform rotate-45 scale-110" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`md:hidden overflow-hidden border-t border-gray-200 transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 pt-4 pb-2"
              : "max-h-0 opacity-0 pt-0 pb-0"
          }`}
        >
          <ul className="flex flex-col items-center space-y-4 text-sm font-serif uppercase tracking-widest">
            <li
              className={`transform transition-all duration-300 delay-75 ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 border-b border-transparent hover:border-gray-900 pb-1 hover:scale-105"
              >
                Home
              </Link>
            </li>
            <li
              className={`transform transition-all duration-300 delay-100 ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <Link
                href="/categories"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 border-b border-transparent hover:border-gray-900 pb-1 hover:scale-105"
              >
                Categories
              </Link>
            </li>
            <li
              className={`transform transition-all duration-300 delay-125 ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 border-b border-transparent hover:border-gray-900 pb-1 hover:scale-105"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Desktop Navigation */}
        <nav className="hidden md:block border-t border-gray-200 pt-6">
          <ul className="flex items-center justify-center gap-12 text-sm font-serif uppercase tracking-widest">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 border-b border-transparent hover:border-gray-900 pb-1 hover:scale-105 hover:tracking-wider"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 border-b border-transparent hover:border-gray-900 pb-1 hover:scale-105 hover:tracking-wider"
              >
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/archive"
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 border-b border-transparent hover:border-gray-900 pb-1 hover:scale-105 hover:tracking-wider"
              >
                Archive
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 transition-all duration-200 border-b border-transparent hover:border-gray-900 pb-1 hover:scale-105 hover:tracking-wider"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
