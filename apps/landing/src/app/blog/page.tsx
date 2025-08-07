import { Metadata } from 'next';

import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogList } from '@/components/blog/BlogList';

export const metadata: Metadata = {
  title: 'Blog - Peak Health',
  description:
    'Fitness tips, workout guides, and health insights from Peak Health experts.',
  keywords: 'fitness blog, workout tips, health advice, exercise guides',
  openGraph: {
    title: 'Blog - Peak Health',
    description:
      'Fitness tips, workout guides, and health insights from Peak Health experts.',
    type: 'website',
  },
};

const BlogPage = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--secondary)' }}>
      <BlogHeader
        title="Peak Health Blog"
        description="Fitness tips, workout guides, and health insights from our experts"
      />
      <BlogList />
    </div>
  );
};

export default BlogPage;
