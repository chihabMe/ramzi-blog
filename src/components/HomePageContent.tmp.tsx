"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  searchPosts,
  type PostPreview,
  type Category,
  type Author,
} from "@/sanity";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FeaturedPost from "@/components/FeaturedPost";
import PostCard from "@/components/PostCard";
import Pagination from "@/components/Pagination";
import CategoriesSection from "./CategoriesSection";
import NewsletterSection from "./NewsletterSection";
import Footer from "./Footer";

interface HomePageContentProps {
  initialPosts: PostPreview[];
  initialFeaturedPost: PostPreview | null;
  categories: Category[];
  authors: Author[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}

export default function HomePageContent({
  initialPosts,
  initialFeaturedPost,
  categories,
  authors,
  currentPage,
  totalPages,
  searchQuery: initialSearchQuery,
}: HomePageContentProps) {
  const [posts, setPosts] = useState<PostPreview[]>(initialPosts);
  const [featuredPost, setFeaturedPost] = useState<PostPreview | null>(
    initialFeaturedPost
  );
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle search functionality
  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      // Clear search - redirect to home page without search params
      router.push("/");
      return;
    }

    try {
      setSearchQuery(query);

      // Update URL with search parameter
      const params = new URLSearchParams(searchParams);
      params.set("search", query);
      params.delete("page"); // Reset page when searching
      router.push(`/?${params.toString()}`);

      const searchResults = await searchPosts(query);

      if (searchResults.length > 0) {
        setFeaturedPost(searchResults[0]);
        setPosts(searchResults.slice(1));
      } else {
        setFeaturedPost(null);
        setPosts([]);
      }
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    router.push(`/?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-light text-gray-900 mb-4">
            Bienvenue sur mon journal
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-serif leading-relaxed">
            Une collection de pensées, d&apos;idées et d&apos;expériences sur la
            technologie, la vie et tout le reste.
          </p>
          <div className="flex justify-center">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Rechercher des articles..."
              defaultValue={searchQuery}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {posts.length + (featuredPost ? 1 : 0)}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Articles
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Catégories
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {authors.length}
              </div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Auteurs
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search Results Header */}
        {searchQuery && (
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Résultats de recherche pour &quot;{searchQuery}&quot;
            </h2>
            <p className="text-gray-600">
              {(featuredPost ? 1 : 0) + posts.length} article(s) trouvé(s)
            </p>
          </div>
        )}

        {/* Featured Post Section */}
        {featuredPost && (
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {searchQuery ? "Meilleur résultat" : "À la une"}
              </h2>
              <div className="w-20 h-1 bg-gray-900 mx-auto mt-4"></div>
            </div>
            <FeaturedPost post={featuredPost} />
          </section>
        )}

        {/* Main Content */}
        {posts.length > 0 ? (
          <section>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {searchQuery ? "Plus de résultats" : "Derniers articles"}
              </h2>
              <div className="w-20 h-1 bg-gray-900 mx-auto"></div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
              {posts.map((post: PostPreview) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            {/* Pagination */}
            {!searchQuery && totalPages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </section>
        ) : (
          <div className="text-center py-16">
            {searchQuery && (
              <div>
                <p className="text-gray-500 text-lg mb-4">
                  Aucun article trouvé pour &quot;{searchQuery}&quot;.
                </p>
                <button
                  onClick={clearSearch}
                  className="text-gray-900 hover:text-gray-700 font-medium underline"
                >
                  Effacer la recherche et afficher tous les articles
                </button>
              </div>
            )}
          </div>
        )}

        {/* Categories Section */}
        <CategoriesSection categories={categories} />
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer categories={categories} />
    </div>
  );
}
