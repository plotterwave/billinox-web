export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  category: string;
  tags: string[];
  featured: boolean;
  readingTime: string;
}
