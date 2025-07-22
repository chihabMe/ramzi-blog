import Link from "next/link";
import { type Category } from "@/sanity";

interface CategoriesSectionProps {
  categories: Category[];
}

export default function CategoriesSection({
  categories,
}: CategoriesSectionProps) {
  if (categories.length === 0) return null;

  return (
    <section className="mt-16 pt-16 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Categories</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category._id}
            href={`/categories/${category.slug.current}`}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
          >
            {category.title}
          </Link>
        ))}
      </div>
    </section>
  );
}
