import { notFound } from "next/navigation";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import {
  getPostsByCategorySlug,
  getCategoryBySlug,
  type Category,
  type PostPreview,
} from "@/sanity";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all categories
export async function generateStaticParams() {
  const { getCategories } = await import("@/sanity");
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug.current }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.title} - Blog Posts`,
    description:
      category.description ||
      `All blog posts in the ${category.title} category`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Fetch the category details and posts
  const [category, posts] = await Promise.all([
    getCategoryBySlug(slug),
    getPostsByCategorySlug(slug),
  ]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Category Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-light text-gray-900 mb-4">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {category.description}
            </p>
          )}
          <div className="mt-8">
            <span className="text-sm text-gray-500">
              {posts.length} {posts.length === 1 ? "post" : "posts"} found
            </span>
          </div>
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No posts found
                </h3>
                <p className="text-gray-600">
                  There are no posts in the "{category.title}" category yet.
                  Check back later for new content!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back to all posts link */}
        <div className="text-center mt-16">
          <a
            href="/"
            className="inline-flex items-center text-gray-700 hover:text-gray-900 font-serif transition-colors duration-200"
          >
            ← Back to all posts
          </a>
        </div>
      </div>
    </div>
  );
}
