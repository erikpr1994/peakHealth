import React from 'react';
import Link from 'next/link';
import { ArrowRight, Dumbbell, Target, TrendingUp } from 'lucide-react';
import { getSignupUrl } from '@/lib/auth';
import styles from './FeatureSection.module.css';

export const FeatureSection = (): React.JSX.Element => {
  const features = [
    {
      icon: <Dumbbell />,
      title: 'Personalized Workouts',
      description:
        'Get custom workout plans tailored to your fitness level and goals.',
    },
    {
      icon: <Target />,
      title: 'Progress Tracking',
      description:
        'Monitor your fitness journey with detailed analytics and insights.',
    },
    {
      icon: <TrendingUp />,
      title: 'Expert Guidance',
      description:
        'Access professional trainers and nutritionists for personalized advice.',
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose PeakHealth?</h2>
          <p className={styles.description}>
            Our comprehensive platform provides everything you need to achieve
            your fitness goals and maintain a healthy lifestyle.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.icon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <h3>Ready to Start Your Fitness Journey?</h3>
          <p>
            Join thousands of users who have transformed their lives with
            PeakHealth.
          </p>
          <Link href={getSignupUrl()} className={styles.ctaButton}>
            Get Started Today
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};
