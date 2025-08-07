'use client';

import { Button } from '@peakhealth/ui';
import { Search, BookOpen } from 'lucide-react';
import React from 'react';
import { useState } from 'react';

import styles from './BlogHeader.module.css';

export const BlogHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.titleSection}>
          <BookOpen className={styles.icon} />
          <div>
            <h1 className={styles.title}>Peak Health Blog</h1>
            <p className={styles.subtitle}>
              Fitness tips, workout guides, and health insights from our experts
            </p>
          </div>
        </div>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchInput}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className={styles.input}
            />
          </div>
          <Button type="submit" variant="primary" size="sm">
            Search
          </Button>
        </form>
      </div>
    </header>
  );
};
