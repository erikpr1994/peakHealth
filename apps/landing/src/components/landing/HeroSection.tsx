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
            <span className={styles.gradientText}> Fitness Companion</span>
          </h1>

          <p className={styles.description}>
            Transform your fitness journey with personalized workout plans,
            real-time progress tracking, and expert guidance. PeakHealth
            combines cutting-edge technology with proven fitness science to help
            you achieve your goals faster and more effectively.
          </p>

          <div className={styles.actions}>
            <Link href={getSignupUrl()} className={styles.primaryButton}>
              Join the Waitlist
              <ArrowRight />
            </Link>
          </div>

          <div className={styles.valueProps}>
            <div className={styles.valueProp}>
              <div className={styles.valueIcon}>🎯</div>
              <div className={styles.valueContent}>
                <h3>Personalized Plans</h3>
                <p>
                  AI-powered workout recommendations tailored to your goals and
                  fitness level
                </p>
              </div>
            </div>
            <div className={styles.valueProp}>
              <div className={styles.valueIcon}>📊</div>
              <div className={styles.valueContent}>
                <h3>Smart Tracking</h3>
                <p>
                  Monitor progress with detailed analytics and insights to stay
                  motivated
                </p>
              </div>
            </div>
            <div className={styles.valueProp}>
              <div className={styles.valueIcon}>👨‍💼</div>
              <div className={styles.valueContent}>
                <h3>Expert Guidance</h3>
                <p>
                  Access to certified trainers and nutritionists for
                  personalized advice
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
