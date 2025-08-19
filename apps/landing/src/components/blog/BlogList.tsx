import { Calendar, Clock, User, Tag } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import styles from './BlogList.module.css';

import { getBlogPosts, BlogPost } from '@/lib/blog';

const BlogList = async (): Promise<React.JSX.Element> => {
  const posts = await getBlogPosts();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {posts.map(post => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && <BlogEmptyState />}
      </div>
    </section>
  );
};

const BlogPostCard = ({ post }: { post: BlogPost }): React.JSX.Element => {
  const t = useTranslations('pages.blog');

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.imagePlaceholder}>
          <span>{post.title.charAt(0)}</span>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <User className={styles.metaIcon} />
            <span>{post.author}</span>
          </div>
          <div className={styles.metaItem}>
            <Calendar className={styles.metaIcon} />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
          </div>
          <div className={styles.metaItem}>
            <Clock className={styles.metaIcon} />
            <span>
              {post.readTime} {t('readTime')}
            </span>
          </div>
        </div>

        <h2 className={styles.title}>
          <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </h2>

        <p className={styles.excerpt}>{post.excerpt}</p>

        <div className={styles.tags}>
          {post.tags.slice(0, 3).map(
            (tag: string): React.JSX.Element => (
              <span key={tag} className={styles.tag}>
                <Tag className={styles.tagIcon} />
                {tag}
              </span>
            )
          )}
        </div>

        <Link href={`/blog/${post.slug}`} className={styles.readMore}>
          {t('readMore')}
        </Link>
      </div>
    </article>
  );
};

const BlogEmptyState = (): React.JSX.Element => {
  const t = useTranslations('pages.blog');

  return (
    <div className={styles.empty}>
      <h3>{t('noPosts.title')}</h3>
      <p>{t('noPosts.description')}</p>
    </div>
  );
};

export { BlogList };
