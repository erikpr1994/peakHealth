import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import styles from './BlogPost.module.css';

import { BlogPost as BlogPostType } from '@/lib/blog';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost = ({ post }: BlogPostProps) => {
  // Simple markdown to HTML conversion for demo purposes
  const renderContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return (
          <h1 key={index} className={styles.h1}>
            {line.substring(2)}
          </h1>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h2 key={index} className={styles.h2}>
            {line.substring(3)}
          </h2>
        );
      }
      if (line.startsWith('### ')) {
        return (
          <h3 key={index} className={styles.h3}>
            {line.substring(4)}
          </h3>
        );
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className={styles.li}>
            {line.substring(2)}
          </li>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <strong key={index} className={styles.strong}>
            {line.substring(2, line.length - 2)}
          </strong>
        );
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className={styles.p}>
          {line}
        </p>
      );
    });
  };

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <Link href="/blog" className={styles.backLink}>
          <ArrowLeft className={styles.backIcon} />
          Back to Blog
        </Link>

        <header className={styles.header}>
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
              <span>{post.readTime} min read</span>
            </div>
          </div>

          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.excerpt}>{post.excerpt}</p>

          <div className={styles.tags}>
            {post.tags.map(tag => (
              <span key={tag} className={styles.tag}>
                <Tag className={styles.tagIcon} />
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className={styles.content}>{renderContent(post.content)}</div>

        <footer className={styles.footer}>
          <div className={styles.author}>
            <div className={styles.authorAvatar}>
              {post.author
                .split(' ')
                .map(n => n[0])
                .join('')}
            </div>
            <div>
              <h3>Written by {post.author}</h3>
              <p>Fitness expert and Peak Health contributor</p>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export { BlogPost };
