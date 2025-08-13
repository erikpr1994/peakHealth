import React from 'react';
import Link from 'next/link';
import { ArrowRight, Dumbbell, BarChart3, Users } from 'lucide-react';
import styles from './FeatureSection.module.css';

export const FeatureSection = (): React.JSX.Element => {
  const features = [
    {
      icon: <Dumbbell />,
      title: 'Log Workouts',
      description:
        'Track your exercises, sets, reps, and weights with our intuitive workout logging interface.',
    },
    {
      icon: <BarChart3 />,
      title: 'Track Progress',
      description:
        'Monitor your gains with detailed charts, personal records, and exercise history.',
    },
    {
      icon: <Users />,
      title: 'Community Driven',
      description:
        'Help shape the future of PeakHealth by voting on features and suggesting improvements.',
    },
  ];

  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Choose PeakHealth?</h2>
          <p className={styles.description}>
            A workout tracker that focuses on what matters most - logging
            workouts, tracking progress, and building a better experience
            together.
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

        <div className={styles.communitySection}>
          <h3>Help Shape the Future</h3>
          <p>
            PeakHealth is community-driven. We believe the best features come
            from the people who use the app every day. Vote on upcoming
            features, suggest improvements, and see what we're working on.
          </p>
          <div className={styles.communityLinks}>
            <Link href="/roadmap" className={styles.roadmapLink}>
              View Roadmap
              <ArrowRight />
            </Link>
            <Link href="/feedback" className={styles.feedbackLink}>
              Suggest Features
              <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
