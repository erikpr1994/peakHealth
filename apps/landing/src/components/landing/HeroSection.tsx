'use client';

import { ArrowRight, Play, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import styles from './HeroSection.module.css';

import { getSignupUrl } from '@/lib/auth';
import { Button } from '@peakhealth/ui';

export const HeroSection = (): React.JSX.Element => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <Star className={styles.starIcon} />
            <span>Join 10,000+ fitness enthusiasts</span>
          </div>

          <h1 className={styles.title}>
            Your Ultimate
            <span className={styles.gradientText}> Fitness Companion</span>
          </h1>

          <p className={styles.description}>
            Track workouts, monitor progress, and achieve your fitness goals
            with Peak Health. Join thousands of users transforming their fitness
            journey with our comprehensive platform.
          </p>

          <div className={styles.actions}>
            <Link href={getSignupUrl()} className={styles.primaryButton}>
              Start Your Journey
              <ArrowRight />
            </Link>

            <Button variant="outline" size="lg">
              <Play />
              Watch Demo
            </Button>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50K+</span>
              <span className={styles.statLabel}>Active Users</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>1M+</span>
              <span className={styles.statLabel}>Workouts Tracked</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4.9</span>
              <span className={styles.statLabel}>App Store Rating</span>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageContainer}>
            <div className={styles.mockup}>
              <div className={styles.screen}>
                <div className={styles.appHeader}>
                  <div className={styles.appIcon}></div>
                  <div className={styles.appTitle}>Peak Health</div>
                </div>
                <div className={styles.appContent}>
                  <div className={styles.workoutCard}>
                    <div className={styles.workoutTitle}>Today's Workout</div>
                    <div className={styles.workoutProgress}>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill}></div>
                      </div>
                      <span>3/5 exercises</span>
                    </div>
                  </div>
                  <div className={styles.statsGrid}>
                    <div className={styles.miniStat}>
                      <div className={styles.miniStatValue}>12</div>
                      <div className={styles.miniStatLabel}>Day Streak</div>
                    </div>
                    <div className={styles.miniStat}>
                      <div className={styles.miniStatValue}>85%</div>
                      <div className={styles.miniStatLabel}>Goal Progress</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
