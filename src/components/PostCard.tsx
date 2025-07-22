import Image from "next/image";
import Link from "next/link";
import { getImageUrl, type PostPreview } from "@/sanity";

interface PostCardProps {
  post: PostPreview;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white border border-gray-200 overflow-hidden hover:shadow-sm transition-all duration-300 group">
      {post.mainImage && (
        <div className="aspect-[4/3] overflow-hidden">
          <Link href={`/posts/${post.slug.current}`}>
            <Image
              src={getImageUrl(post.mainImage, 400, 300)}
              alt={post.title}
              width={400}
              height={300}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
          </Link>
        </div>
      )}

      <div className="p-4 sm:p-5 md:p-6">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            {post.categories.slice(0, 1).map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug.current}`}
                className="text-xs sm:text-sm font-medium text-gray-600 uppercase tracking-wider hover:text-blue-600 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
          <Link
            href={`/posts/${post.slug.current}`}
            className="hover:text-gray-700 transition-colors duration-200"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta information */}
        <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            {post.author && (
              <>
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-xs sm:text-sm">
                    {post.author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600">
                  {post.author.name}
                </span>
              </>
            )}
          </div>

          {post.publishedAt && (
            <time
              dateTime={post.publishedAt}
              className="text-xs sm:text-sm text-gray-500"
            >
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          )}
        </div>
      </div>
    </article>
  );
}
