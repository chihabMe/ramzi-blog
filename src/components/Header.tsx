import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b-2 border-gray-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Main header */}
        <div className="text-center mb-6">
          <Link href="/" className="group">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-2 tracking-wider group-hover:text-gray-700 transition-colors duration-300">
              RAMZI BLOG
            </h1>
            <div className="w-24 h-px bg-gray-900 mx-auto mb-3"></div>
            <p className="text-sm font-serif text-gray-600 uppercase tracking-[0.2em]">
              Thoughts • Ideas • Stories
            </p>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-200 pt-6">
          <ul className="flex items-center justify-center gap-12 text-sm font-serif uppercase tracking-widest">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 border-b border-transparent hover:border-gray-900 pb-1"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 border-b border-transparent hover:border-gray-900 pb-1"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/archive"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 border-b border-transparent hover:border-gray-900 pb-1"
              >
                Archive
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 border-b border-transparent hover:border-gray-900 pb-1"
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
