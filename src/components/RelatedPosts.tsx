"use client";

import { useState, useEffect } from "react";
import PostCard from "@/components/PostCard";
import { type PostPreview } from "@/sanity";

interface RelatedPostsProps {
  currentPostId: string;
  categories: string[];
  tags?: string[];
}

export default function RelatedPosts({
  currentPostId,
  categories,
  tags = [],
}: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        // This would normally be a Sanity query
        // For now, we'll simulate related posts
        const mockRelatedPosts: PostPreview[] = [];
        setRelatedPosts(mockRelatedPosts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedPosts();
  }, [currentPostId, categories, tags]);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
            Articles Similaires
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 animate-pulse"
              >
                <div className="aspect-[4/3] bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Articles Similaires
          </h2>
          <div className="w-16 h-1 bg-gray-900 mx-auto"></div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {relatedPosts.slice(0, 3).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
