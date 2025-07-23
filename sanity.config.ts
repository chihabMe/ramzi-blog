import author from "@/sanity/schemas/author";
import blockContent from "@/sanity/schemas/blockContent";
import category from "@/sanity/schemas/category";
import contact from "@/sanity/schemas/contact";
import newsletter from "@/sanity/schemas/newsletter";
import post from "@/sanity/schemas/post";
import { aiWriterPlugin } from "@/sanity/plugins/aiWriter";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

const config = defineConfig({
  name: "default",
  title: "Ramzi blog",
  projectId: "xwvmvdty",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool(), aiWriterPlugin()],
  schema: {
    types: [author, blockContent, category, post, newsletter, contact],
  },
});

export default config;
