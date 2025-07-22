import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getPostBySlug, getPostSlugs, getImageUrl } from "@/sanity";
import Header from "@/components/Header";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* Back to blog link */}
        <Link
          href="/"
          className="inline-flex items-center text-sm sm:text-base text-gray-700 hover:text-gray-900 mb-8 sm:mb-10 md:mb-12 font-serif transition-colors duration-200"
        >
          ← Return to Articles
        </Link>

        <article className="bg-white shadow-lg rounded-none border border-gray-200">
          {/* Post header */}
          <header className="px-4 sm:px-6 md:px-8 lg:px-12 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 border-b border-gray-200">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-light text-gray-900 mb-6 sm:mb-8 leading-tight text-center px-2">
              {post.title}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-gray-600 mb-6 sm:mb-8 font-serif">
              <span className="text-xs sm:text-sm uppercase tracking-wider">
                By {post.author?.name || "Unknown Author"}
              </span>
              <span className="text-xs hidden sm:inline">•</span>
              <time
                dateTime={post.publishedAt}
                className="text-xs sm:text-sm uppercase tracking-wider"
              >
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 px-2">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 border border-gray-300 text-gray-700 text-xs sm:text-sm font-serif uppercase tracking-widest rounded-none hover:bg-gray-100 transition-colors duration-200"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Main image */}
            {post.mainImage && (
              <div className="aspect-[4/3] sm:aspect-[3/2] md:aspect-[4/3] overflow-hidden border border-gray-300 mb-6 sm:mb-8">
                <Image
                  src={getImageUrl(post.mainImage, 800, 600)}
                  alt={post.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  priority
                />
              </div>
            )}
          </header>

          {/* Post content */}
          <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12">
            <div className="prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none font-serif leading-relaxed">
              <PortableText
                value={post.body}
                components={{
                  types: {
                    image: ({ value }) => (
                      <div className="my-8 sm:my-10 md:my-12 text-center">
                        <Image
                          src={getImageUrl(value, 700)}
                          alt={value.alt || ""}
                          width={700}
                          height={467}
                          className="border border-gray-300 grayscale hover:grayscale-0 transition-all duration-500 w-full h-auto"
                        />
                        {value.caption && (
                          <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4 italic font-serif">
                            {value.caption}
                          </p>
                        )}
                      </div>
                    ),
                  },
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-4 sm:mb-6 text-gray-800 leading-loose text-base sm:text-lg md:text-xl font-serif">
                        {children}
                      </p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-light text-gray-900 mt-10 sm:mt-12 md:mt-16 mb-6 sm:mb-8 text-center">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-gray-900 mt-8 sm:mt-10 md:mt-12 mb-4 sm:mb-6 text-center">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-light text-gray-900 mt-6 sm:mt-8 mb-3 sm:mb-4">
                        {children}
                      </h3>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-gray-400 pl-4 sm:pl-6 md:pl-8 italic text-gray-700 my-6 sm:my-8 text-lg sm:text-xl md:text-2xl font-serif leading-relaxed">
                        {children}
                      </blockquote>
                    ),
                  },
                  marks: {
                    link: ({ children, value }) => (
                      <a
                        href={value.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-900 underline decoration-2 hover:decoration-4 transition-all duration-200"
                      >
                        {children}
                      </a>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-gray-900">
                        {children}
                      </strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic font-serif">{children}</em>
                    ),
                  },
                  list: {
                    bullet: ({ children }) => (
                      <ul className="list-disc list-inside mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-base sm:text-lg md:text-xl font-serif">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside mb-4 sm:mb-6 space-y-1 sm:space-y-2 text-base sm:text-lg md:text-xl font-serif">
                        {children}
                      </ol>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => (
                      <li className="text-gray-800 leading-relaxed">
                        {children}
                      </li>
                    ),
                    number: ({ children }) => (
                      <li className="text-gray-800 leading-relaxed">
                        {children}
                      </li>
                    ),
                  },
                }}
              />
            </div>
          </div>

          {/* Author bio */}
          {post.author?.bio && (
            <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 bg-gray-50 border-t border-gray-200">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-light text-gray-900 mb-6 sm:mb-8 uppercase tracking-wider">
                  About the Author
                </h3>
                <div className="flex flex-col items-center gap-4 sm:gap-6">
                  {post.author.image && (
                    <Image
                      src={getImageUrl(post.author.image, 120, 120)}
                      alt={post.author.name}
                      width={120}
                      height={120}
                      className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  )}
                  <div>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-serif font-medium text-gray-900 mb-3 sm:mb-4">
                      {post.author.name}
                    </h4>
                    <div className="prose prose-sm sm:prose-base md:prose-lg text-gray-600 font-serif text-center">
                      <PortableText value={post.author.bio} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
