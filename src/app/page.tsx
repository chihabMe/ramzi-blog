import HomePageContent from "@/components/HomePageContent";
import {
  getCategories,
  getPostsPaginated,
  searchPosts,
  type PostPreview,
} from "@/sanity";
import { getAuthors } from "@/sanity/utils";

const POSTS_PER_PAGE = 6;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
}) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const searchQuery = params.search || "";

  try {
    // Fetch categories and authors
    const [categories, authors] = await Promise.all([
      getCategories(),
      getAuthors(),
    ]);

    let featuredPost: PostPreview | null = null;
    let posts: PostPreview[] = [];
    let totalPages = 1;

    if (searchQuery) {
      // Handle search results
      const searchResults = await searchPosts(searchQuery);
      if (searchResults.length > 0) {
        featuredPost = searchResults[0];
        posts = searchResults.slice(1);
      }
      totalPages = 1; // Show all search results on one page
    } else {
      // Handle regular pagination
      const { posts: paginatedPosts, totalPages: pages } =
        await getPostsPaginated(currentPage, POSTS_PER_PAGE);

      if (currentPage === 1 && paginatedPosts.length > 0) {
        featuredPost = paginatedPosts[0];
        posts = paginatedPosts.slice(1);
      } else {
        posts = paginatedPosts;
      }
      totalPages = pages;
    }

    return (
      <HomePageContent
        initialPosts={posts}
        initialFeaturedPost={featuredPost}
        categories={categories}
        authors={authors}
        currentPage={currentPage}
        totalPages={totalPages}
        searchQuery={searchQuery}
      />
    );
  } catch (error) {
    console.error("Error loading page data:", error);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Error loading page data</p>
          <p className="text-gray-600 mt-2">Please try again later</p>
        </div>
      </div>
    );
  }
}
