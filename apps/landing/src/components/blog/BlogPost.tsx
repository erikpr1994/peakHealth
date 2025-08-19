import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useTranslations } from 'next-intl';

import styles from './BlogPost.module.css';

import { BlogPost as BlogPostType } from '@/lib/blog';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost = ({ post }: BlogPostProps) => {
  const t = useTranslations('pages.blog');
  // Improved markdown to HTML conversion
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactElement[] = [];
    let currentList: React.ReactElement[] = [];
    let inList = false;

    const processInlineMarkdown = (text: string) => {
      // Handle inline bold text
      const parts = text.split(/(\*\*.*?\*\*)/g);
      return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={index} className={styles.strong}>
              {part.substring(2, part.length - 2)}
            </strong>
          );
        }
        return part;
      });
    };

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className={styles.ul}>
            {currentList}
          </ul>
        );
        currentList = [];
        inList = false;
      }
    };

    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className={styles.h1}>
            {processInlineMarkdown(line.substring(2))}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className={styles.h2}>
            {processInlineMarkdown(line.substring(3))}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className={styles.h3}>
            {processInlineMarkdown(line.substring(4))}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        if (!inList) {
          inList = true;
        }
        currentList.push(
          <li key={`li-${currentList.length}`} className={styles.li}>
            {processInlineMarkdown(line.substring(2))}
          </li>
        );
      } else if (line.trim() === '') {
        flushList();
        elements.push(<br key={index} />);
      } else {
        flushList();
        elements.push(
          <p key={index} className={styles.p}>
            {processInlineMarkdown(line)}
          </p>
        );
      }
    });

    // Flush any remaining list items
    flushList();

    return elements;
  };

  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <Link href="/blog" className={styles.backLink}>
          <ArrowLeft className={styles.backIcon} />
          {t('backToBlog')}
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
              <span>{post.readTime} {t('readTime')}</span>
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
              <h3>{t('writtenBy')} {post.author}</h3>
              <p>{t('authorDescription')}</p>
            </div>
          </div>
        </footer>
      </div>
    </article>
  );
};

export { BlogPost };
