import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogPost } from '@/components/blog/BlogPost';
import { getBlogPost, getBlogPosts } from '@/lib/blog';

// Build first 6 articles statically, rest on demand
export const revalidate = 3600; // Revalidate every hour for on-demand articles

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getBlogPosts();
  // Only generate the first 6 articles statically
  const staticPosts = posts.slice(0, 6);
  return staticPosts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found - Peak Health Blog',
    };
  }

  return {
    title: `${post.title} - Peak Health Blog`,
    description: post.excerpt,
    keywords: post.tags?.join(', '),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author,
      tags: post.tags,
    },
  };
}

const BlogPostPage = async ({
  params,
}: BlogPostPageProps): Promise<React.JSX.Element> => {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
};

export default BlogPostPage;
