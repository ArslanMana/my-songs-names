"use client";
import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" }); // logs out and redirects to login
  };
  return (
    <>
      {/* 🌤 Header */}
      <header className="w-full bg-white border-b border-gray-200 text-gray-800 px-4 md:px-8 py-3  shadow-sm">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-xl font-bold flex items-center gap-1">
            🎵 <span>MySongs</span>
          </h1>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 font-medium">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            {user ? (
              <>
                <Link href="/" className="hover:text-blue-600 transition">
                  Favorites
                </Link>
                <span className="text-gray-700">Hello, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hover:text-blue-600 transition">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hover:text-blue-600 transition"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-1 text-gray-700 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* 🌈 Sidebar / Mobile Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r z-50 border-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 flex flex-col`}
      >
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-2xl font-bold flex items-center gap-1">
            🎵 MySongs
          </h2>
          {user && <p className="mt-1 text-gray-700">Hello, {user.name}</p>}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Home
          </Link>
          {user ? (
            <>
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Favorites
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </aside>

      {/* 🩶 Overlay (Mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
        />
      )}
    </>
  );
}

git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ArslanMana/my-songs-names.git
git push -u origin main