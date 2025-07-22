// GROQ queries for fetching data from Sanity

// Get all posts with basic information for listing
export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author->{
    name,
    slug
  },
  mainImage,
  categories[]->{
    _id,
    title,
    slug
  },
  publishedAt,
  "excerpt": array::join(string::split((pt::text(body))[0..255], "")[0..255], "") + "..."
}`;

// Get a single post by slug with full content
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  author->{
    _id,
    name,
    slug,
    image,
    bio
  },
  mainImage,
  categories[]->{
    _id,
    title,
    description
  },
  publishedAt,
  body
}`;

// Get all post slugs for static generation
export const postSlugsQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

// Get all authors
export const authorsQuery = `*[_type == "author"] {
  _id,
  name,
  slug,
  image,
  bio
}`;

// Get all categories
export const categoriesQuery = `*[_type == "category"] {
  _id,
  title,
  slug,
  description
}`;

// Get posts by category
export const postsByCategoryQuery = `*[_type == "post" && $categoryId in categories[]._ref] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author->{
    name,
    slug
  },
  mainImage,
  categories[]->{
    _id,
    title
  },
  publishedAt,
  "excerpt": array::join(string::split((pt::text(body))[0..255], "")[0..255], "") + "..."
}`;

// Get posts by category slug
export const postsByCategorySlugQuery = `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author->{
    name,
    slug
  },
  mainImage,
  categories[]->{
    _id,
    title,
    slug
  },
  publishedAt,
  "excerpt": array::join(string::split((pt::text(body))[0..255], "")[0..255], "") + "..."
}`;

// Get posts by author
export const postsByAuthorQuery = `*[_type == "post" && author._ref == $authorId] | order(publishedAt desc) {
  _id,
  title,
  slug,
  author->{
    name,
    slug
  },
  mainImage,
  categories[]->{
    _id,
    title,
    slug
  },
  publishedAt,
  "excerpt": array::join(string::split((pt::text(body))[0..255], "")[0..255], "") + "..."
}`;

// Newsletter queries
export const newsletterSubscribersQuery = `*[_type == "newsletter" && isActive == true] | order(subscribedAt desc) {
  _id,
  email,
  subscribedAt,
  firstName,
  lastName,
  source
}`;

export const newsletterByEmailQuery = `*[_type == "newsletter" && email == $email][0] {
  _id,
  email,
  isActive,
  subscribedAt
}`;

// Contact queries
export const contactMessagesQuery = `*[_type == "contact"] | order(submittedAt desc) {
  _id,
  name,
  email,
  subject,
  message,
  isRead,
  submittedAt,
  status
}`;

export const contactMessageByIdQuery = `*[_type == "contact" && _id == $id][0] {
  _id,
  name,
  email,
  subject,
  message,
  isRead,
  submittedAt,
  status
}`;

export const unreadContactMessagesQuery = `*[_type == "contact" && isRead == false] | order(submittedAt desc) {
  _id,
  name,
  email,
  subject,
  submittedAt,
  status
}`;
