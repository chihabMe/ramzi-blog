import { PortableTextBlock } from "@portabletext/types";

export interface Author {
  _id: string;
  _type: "author";
  name: string;
  slug: {
    current: string;
  };
  image?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: boolean;
  };
  bio?: PortableTextBlock[];
}

export interface Category {
  _id: string;
  _type: "category";
  title: string;
  slug: {
    current: string;
  };
  description?: string;
}

export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: {
    current: string;
  };
  author?: Author;
  mainImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
    hotspot?: boolean;
  };
  categories?: Category[];
  publishedAt: string;
  body: PortableTextBlock[];
}

export interface PostPreview {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author?: {
    name: string;
  };
  mainImage?: {
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  categories?: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  }[];
  publishedAt: string;
  excerpt?: string;
}

export interface Newsletter {
  _id: string;
  _type: "newsletter";
  email: string;
  subscribedAt: string;
  isActive: boolean;
  source: "website" | "blog_post" | "social_media" | "direct";
}

export interface Contact {
  _id: string;
  _type: "contact";
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  submittedAt: string;
  status: "new" | "in-progress" | "replied" | "closed";
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
