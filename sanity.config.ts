import author from "@/sanity/schemas/author";
import blockContent from "@/sanity/schemas/blockContent";
import category from "@/sanity/schemas/category";
import newsletter from "@/sanity/schemas/newsletter";
import post from "@/sanity/schemas/post";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

const config = defineConfig({
  name: "default",
  title: "Ramzi blog",
  projectId: "xwvmvdty",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: [author, blockContent, category, post, newsletter] },
});

export default config;
