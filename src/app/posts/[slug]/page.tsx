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

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Back to blog link */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-700 hover:text-gray-900 mb-12 font-serif transition-colors duration-200"
        >
          ← Return to Articles
        </Link>

        <article className="bg-white shadow-lg rounded-none border border-gray-200">
          {/* Post header */}
          <header className="px-12 pt-16 pb-8 border-b border-gray-200">
            <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-8 leading-tight text-center">
              {post.title}
            </h1>

            <div className="flex items-center justify-center gap-6 text-gray-600 mb-8 font-serif">
              <span className="text-sm uppercase tracking-wider">
                By {post.author?.name || "Unknown Author"}
              </span>
              <span className="text-xs">•</span>
              <time
                dateTime={post.publishedAt}
                className="text-sm uppercase tracking-wider"
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
              <div className="flex items-center justify-center gap-3 mb-12">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="px-4 py-2 border border-gray-300 text-gray-700 text-xs font-serif uppercase tracking-widest rounded-none hover:bg-gray-100 transition-colors duration-200"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            )}

            {/* Main image */}
            {post.mainImage && (
              <div className="aspect-[4/3] overflow-hidden border border-gray-300 mb-8">
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
          <div className="px-12 py-12">
            <div className="prose prose-xl max-w-none font-serif leading-relaxed">
              <PortableText
                value={post.body}
                components={{
                  types: {
                    image: ({ value }) => (
                      <div className="my-12 text-center">
                        <Image
                          src={getImageUrl(value, 700)}
                          alt={value.alt || ""}
                          width={700}
                          height={467}
                          className="border border-gray-300 grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        {value.caption && (
                          <p className="text-sm text-gray-500 mt-4 italic font-serif">
                            {value.caption}
                          </p>
                        )}
                      </div>
                    ),
                  },
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-6 text-gray-800 leading-loose text-lg font-serif">
                        {children}
                      </p>
                    ),
                    h1: ({ children }) => (
                      <h1 className="text-4xl font-serif font-light text-gray-900 mt-16 mb-8 text-center">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-3xl font-serif font-light text-gray-900 mt-12 mb-6 text-center">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-2xl font-serif font-light text-gray-900 mt-8 mb-4">
                        {children}
                      </h3>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-gray-400 pl-8 italic text-gray-700 my-8 text-xl font-serif leading-relaxed">
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
                      <ul className="list-disc list-inside mb-6 space-y-2 text-lg font-serif">
                        {children}
                      </ul>
                    ),
                    number: ({ children }) => (
                      <ol className="list-decimal list-inside mb-6 space-y-2 text-lg font-serif">
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
            <div className="px-12 py-12 bg-gray-50 border-t border-gray-200">
              <div className="max-w-2xl mx-auto text-center">
                <h3 className="text-2xl font-serif font-light text-gray-900 mb-8 uppercase tracking-wider">
                  About the Author
                </h3>
                <div className="flex flex-col items-center gap-6">
                  {post.author.image && (
                    <Image
                      src={getImageUrl(post.author.image, 120, 120)}
                      alt={post.author.name}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-white shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  )}
                  <div>
                    <h4 className="text-xl font-serif font-medium text-gray-900 mb-4">
                      {post.author.name}
                    </h4>
                    <div className="prose prose-lg text-gray-600 font-serif text-center">
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
