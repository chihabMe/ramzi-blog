"use client";

import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    updateTheme(shouldBeDark);
  }, []);

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    updateTheme(newDarkMode);

    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-14 h-7 bg-gray-200 rounded-full animate-pulse"></div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="relative inline-flex items-center w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 group"
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
    >
      {/* Toggle Track */}
      <div
        className={`absolute inset-0 rounded-full transition-all duration-300 ${
          isDark
            ? "bg-gradient-to-r from-blue-500 to-purple-500"
            : "bg-gradient-to-r from-yellow-400 to-orange-400"
        }`}
      />

      {/* Toggle Circle */}
      <div
        className={`relative w-5 h-5 bg-white rounded-full shadow-lg transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
          isDark ? "translate-x-7" : "translate-x-1"
        }`}
      >
        {/* Sun Icon */}
        <svg
          className={`w-3 h-3 text-yellow-500 transition-all duration-300 ${
            isDark ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`w-3 h-3 text-blue-500 absolute transition-all duration-300 ${
            isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
    </button>
  );
}

// Theme Provider Component
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initial theme setup
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (shouldBeDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
    }

    // Set up system theme change listener
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem("theme");
      if (!savedTheme) {
        if (e.matches) {
          document.documentElement.setAttribute("data-theme", "dark");
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
          document.documentElement.classList.remove("dark");
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return <>{children}</>;
}
