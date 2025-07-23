"use client";

import { useState, useEffect } from "react";

export default function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      setIsVisible(scrollTop > 100); // Show after scrolling 100px
    };

    window.addEventListener("scroll", updateProgress);
    updateProgress(); // Initial call

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50 transition-opacity duration-300">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center group ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        aria-label="Retour en haut"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 group-hover:scale-110 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>

        {/* Reading Progress Circle */}
        <svg
          className="absolute inset-0 w-12 h-12 transform -rotate-90"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="4"
          />
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeWidth="4"
            strokeDasharray={`${2 * Math.PI * 20}`}
            strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-100 ease-out"
          />
        </svg>
      </button>

      {/* Reading Time Indicator */}
      <div
        className={`fixed bottom-24 right-8 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-lg transition-all duration-300 z-40 ${
          isVisible && progress > 5
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="text-xs text-gray-600 font-medium">
          Lecture: {Math.round(progress)}%
        </div>
      </div>
    </>
  );
}
