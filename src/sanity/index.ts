// Sanity client and utilities
export { client } from "./client";

// Types
export type { Post, PostPreview, Author, Category, Newsletter } from "./types";

// Data fetching functions
export {
  getPosts,
  getPostBySlug,
  getPostSlugs,
  getAuthors,
  getCategories,
  getCategoryBySlug,
  getPostsByCategory,
  getPostsByCategorySlug,
  getPostsByAuthor,
  searchPosts,
  getPostsPaginated,
  getImageUrl,
  subscribeToNewsletter,
  getNewsletterSubscribers,
  checkEmailSubscription,
} from "./utils";

// GROQ queries (if you need them directly)
export {
  postsQuery,
  postBySlugQuery,
  postSlugsQuery,
  authorsQuery,
  categoriesQuery,
  postsByCategoryQuery,
  postsByCategorySlugQuery,
  postsByAuthorQuery,
  newsletterSubscribersQuery,
  newsletterByEmailQuery,
} from "./queries";
