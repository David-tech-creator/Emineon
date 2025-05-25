import { createClient } from 'contentful';
import { cache } from 'react';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: any; // Rich text document from Contentful
  status: string;
  featuredImage?: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  author?: {
    name: string;
    image?: {
      url: string;
      alt: string;
    };
  };
}

export const fetchAllPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const entries = await client.getEntries({
      content_type: 'pageBlogPost', // This matches your Contentful content type ID
      order: ['-sys.createdAt'], // Sort by creation date, newest first
      include: 2, // Include linked assets and entries
    });

    return entries.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title || 'Untitled',
      slug: item.fields.slug || '',
      date: item.fields.publishedDate || item.sys.createdAt,
      tags: [], // You can add tags field to Contentful if needed
      excerpt: item.fields.subtitle || '',
      content: item.fields.content || '',
      status: 'published', // Contentful entries are published by default
      featuredImage: item.fields.featuredImage ? {
        url: `https:${item.fields.featuredImage.fields.file.url}`,
        alt: item.fields.featuredImage.fields.title || item.fields.featuredImage.fields.description || 'Blog post image',
        width: item.fields.featuredImage.fields.file.details.image?.width || 800,
        height: item.fields.featuredImage.fields.file.details.image?.height || 600,
      } : undefined,
      author: item.fields.author ? {
        name: item.fields.author.fields.name || 'Anonymous',
        image: item.fields.author.fields.image ? {
          url: `https:${item.fields.author.fields.image.fields.file.url}`,
          alt: item.fields.author.fields.image.fields.title || item.fields.author.fields.name || 'Author image',
        } : undefined,
      } : undefined,
    }));
  } catch (error) {
    console.error('Error fetching posts from Contentful:', error);
    return [];
  }
});

export const fetchBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const entries = await client.getEntries({
      content_type: 'pageBlogPost',
      'fields.slug': slug,
      limit: 1,
      include: 2, // Include linked assets and entries
    });

    if (entries.items.length === 0) {
      return null;
    }

    const item = entries.items[0] as any;
    return {
      id: item.sys.id,
      title: item.fields.title || 'Untitled',
      slug: item.fields.slug || '',
      date: item.fields.publishedDate || item.sys.createdAt,
      tags: [], // You can add tags field to Contentful if needed
      excerpt: item.fields.subtitle || '',
      content: item.fields.content || '',
      status: 'published', // Contentful entries are published by default
      featuredImage: item.fields.featuredImage ? {
        url: `https:${item.fields.featuredImage.fields.file.url}`,
        alt: item.fields.featuredImage.fields.title || item.fields.featuredImage.fields.description || 'Blog post image',
        width: item.fields.featuredImage.fields.file.details.image?.width || 800,
        height: item.fields.featuredImage.fields.file.details.image?.height || 600,
      } : undefined,
      author: item.fields.author ? {
        name: item.fields.author.fields.name || 'Anonymous',
        image: item.fields.author.fields.image ? {
          url: `https:${item.fields.author.fields.image.fields.file.url}`,
          alt: item.fields.author.fields.image.fields.title || item.fields.author.fields.name || 'Author image',
        } : undefined,
      } : undefined,
    };
  } catch (error) {
    console.error('Error fetching post by slug from Contentful:', error);
    return null;
  }
}); 