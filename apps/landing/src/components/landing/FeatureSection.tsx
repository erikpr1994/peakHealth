import {
  Activity,
  Target,
  Users,
  BarChart3,
  Calendar,
  Award,
} from 'lucide-react';

import styles from './FeatureSection.module.css';

import { getSignupUrl } from '@/lib/auth';

const features = [
  {
    icon: Activity,
    title: 'Workout Tracking',
    description:
      'Track your workouts with detailed exercise logging, sets, reps, and weights. Monitor your progress over time with comprehensive analytics.',
  },
  {
    icon: Target,
    title: 'Goal Setting',
    description:
      'Set personalized fitness goals and track your progress. Get motivated with milestone achievements and progress visualizations.',
  },
  {
    icon: Users,
    title: 'Social Features',
    description:
      'Connect with friends, join challenges, and share your achievements. Build a supportive community around your fitness journey.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description:
      'Get deep insights into your performance with detailed charts, trends, and personalized recommendations based on your data.',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description:
      'Plan your workouts with intelligent scheduling that adapts to your routine and provides optimal training recommendations.',
  },
  {
    icon: Award,
    title: 'Achievement System',
    description:
      'Earn badges, unlock achievements, and celebrate your milestones. Stay motivated with gamified progress tracking.',
  },
];

export const FeatureSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Everything you need to
            <span className={styles.gradientText}> achieve your goals</span>
          </h2>
          <p className={styles.subtitle}>
            Peak Health provides all the tools and features you need to
            transform your fitness journey and reach your goals faster than ever
            before.
          </p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.feature}>
              <div className={styles.iconContainer}>
                <feature.icon className={styles.icon} />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <p className={styles.ctaText}>
            Ready to start your fitness transformation?
          </p>
          <a href={getSignupUrl()} className={styles.ctaButton}>
            Get Started Free
          </a>
        </div>
      </div>
    </section>
  );
};
