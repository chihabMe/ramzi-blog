import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "xwvmvdty",
  dataset: "production",
  apiVersion: "2024-01-01", // Use current date
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production for faster response times
  token: process.env.SANITY_API_TOKEN, // Add token for write operations
});
