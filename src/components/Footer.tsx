import Link from "next/link";
import { type Category } from "@/sanity";

interface FooterProps {
  categories: Category[];
}

export default function Footer({ categories }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ramzi's Blog</h3>
            <p className="text-gray-400">
              Sharing thoughts, ideas, and experiences about technology and
              life.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="hover:text-white">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-white">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              {categories.slice(0, 5).map((category) => (
                <li key={category._id}>
                  <Link
                    href={`/categories/${category.title.toLowerCase()}`}
                    className="hover:text-white"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            © 2025 Ramzi's Blog. Powered by{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Next.js
            </a>{" "}
            and{" "}
            <a
              href="https://sanity.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Sanity
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
