import Image from "next/image";
import Link from "next/link";
import { getImageUrl, type PostPreview } from "@/sanity";

interface FeaturedPostProps {
  post: PostPreview;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="relative bg-white border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
      {post.mainImage && (
        <div className="relative aspect-[16/9] sm:aspect-[3/2] md:aspect-[16/9] overflow-hidden">
          <Image
            src={getImageUrl(post.mainImage, 800, 450)}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Featured Badge */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
            <span className="inline-flex items-center px-2 sm:px-3 py-1 bg-red-600 text-white text-xs sm:text-sm font-semibold tracking-wide uppercase">
              Featured Article
            </span>
          </div>

          {/* Categories overlay */}
          {post.categories && post.categories.length > 0 && (
            <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
              <div className="flex gap-1 sm:gap-2">
                {post.categories.slice(0, 2).map((category) => (
                  <span
                    key={category.title}
                    className="px-1.5 sm:px-2 py-1 bg-white/90 text-gray-800 text-xs font-medium uppercase tracking-wide backdrop-blur-sm"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="max-w-3xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            <Link
              href={`/posts/${post.slug.current}`}
              className="hover:text-gray-700 transition-colors duration-200"
            >
              {post.title}
            </Link>
          </h2>

          {post.excerpt && (
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-3 sm:pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-3 sm:space-x-4">
              {post.author && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-600 font-semibold text-xs sm:text-sm">
                      {post.author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">
                      {post.author.name}
                    </p>
                    {post.publishedAt && (
                      <p className="text-xs text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href={`/posts/${post.slug.current}`}
              className="inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors duration-200 w-full sm:w-auto"
            >
              Read Full Article
              <svg
                className="ml-2 w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
