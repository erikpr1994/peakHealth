import { Metadata } from 'next';
import React from 'react';
import { useTranslations } from 'next-intl';

import { BlogHeader } from '@/components/blog/BlogHeader';
import { BlogList } from '@/components/blog/BlogList';

// Force static generation for blog listing page
export const dynamic = 'force-static';
export const revalidate = false;

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

const BlogPage = (): React.JSX.Element => {
  const t = useTranslations('pages.blog');

  return (
    <>
      <BlogHeader
        title={t('title')}
        description={t('description')}
      />
      <BlogList />
    </>
  );
};

export default BlogPage;
