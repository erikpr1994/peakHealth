'use client';

import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { getSignupUrl } from '@/lib/auth';
import styles from './HeroSection.module.css';

export const HeroSection = (): React.JSX.Element => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <Star className={styles.starIcon} />
            <span>Coming Soon - Be the First to Experience</span>
          </div>

          <h1 className={styles.title}>
            Your Ultimate
            <span className={styles.gradientText}> Workout Tracker</span>
          </h1>

          <p className={styles.description}>
            Log workouts, track progress, and stay motivated with PeakHealth.
            Build routines, measure your gains, and join a community of fitness
            enthusiasts working towards their goals.
          </p>

          <div className={styles.actions}>
            <Link href={getSignupUrl()} className={styles.primaryButton}>
              Join the Waitlist
              <ArrowRight />
            </Link>
          </div>

          <div className={styles.valueProps}>
            <div className={styles.valueProp}>
              <div className={styles.valueIcon}>📝</div>
              <div className={styles.valueContent}>
                <h3>Log Workouts</h3>
                <p>
                  Track your exercises, sets, reps, and weights with our
                  intuitive workout logging interface
                </p>
              </div>
            </div>
            <div className={styles.valueProp}>
              <div className={styles.valueIcon}>📊</div>
              <div className={styles.valueContent}>
                <h3>Track Progress</h3>
                <p>
                  Monitor your gains with detailed charts, personal records, and
                  exercise history
                </p>
              </div>
            </div>
            <div className={styles.valueProp}>
              <div className={styles.valueIcon}>👥</div>
              <div className={styles.valueContent}>
                <h3>Join Community</h3>
                <p>
                  Connect with other fitness enthusiasts, share workouts, and
                  stay accountable together
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.imageContainer}>
            <div className={styles.mockup}>
              <div className={styles.screen}>
                <div className={styles.appHeader}>
                  <div className={styles.appIcon}></div>
                  <div className={styles.appTitle}>PeakHealth</div>
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
