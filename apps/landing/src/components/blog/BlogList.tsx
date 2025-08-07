import { Calendar, Clock, User, Tag } from 'lucide-react';
import Link from 'next/link';

import styles from './BlogList.module.css';

import { getBlogPosts } from '@/lib/blog';

const BlogList = async () => {
  const posts = await getBlogPosts();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {posts.map(post => (
            <article key={post.slug} className={styles.card}>
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
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.metaItem}>
                    <Clock className={styles.metaIcon} />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                <h2 className={styles.title}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className={styles.titleLink}
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className={styles.excerpt}>{post.excerpt}</p>

                <div className={styles.tags}>
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag} className={styles.tag}>
                      <Tag className={styles.tagIcon} />
                      {tag}
                    </span>
                  ))}
                </div>

                <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className={styles.empty}>
            <h3>No blog posts found</h3>
            <p>Check back soon for new content!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export { BlogList };
