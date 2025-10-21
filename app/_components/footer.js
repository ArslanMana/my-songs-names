export default function Footer() {
  return (
    <footer className="bg-white border-t px-4 md:px-8 border-gray-200 text-gray-700 mt-10">
      <div className="max-w-6xl mx-auto  py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* 🎵 Logo / Brand */}
        <div className="flex items-center gap-1 font-semibold text-lg">
          🎵 <span>MySongs</span>
        </div>

        {/* 🧭 Footer Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
          <a href="/" className="hover:text-blue-600 transition">
            Home
          </a>
          <a href="/favorites" className="hover:text-blue-600 transition">
            Favorites
          </a>
          <a href="/login" className="hover:text-blue-600 transition">
            Login
          </a>
          <a href="/register" className="hover:text-blue-600 transition">
            Register
          </a>
        </nav>

        {/* 💬 Copyright */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} MySongs. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
