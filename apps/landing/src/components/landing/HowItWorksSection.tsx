import React from 'react';
import { ArrowRight, Calendar, BarChart3, Target } from 'lucide-react';
import styles from './HowItWorksSection.module.css';

export const HowItWorksSection = (): React.JSX.Element => {
  const steps = [
    {
      icon: <Calendar />,
      title: 'Create Your Routine',
      description:
        'Build custom workout routines or choose from our library of exercises. Set your goals and track your progress.',
    },
    {
      icon: <Target />,
      title: 'Log Your Workouts',
      description:
        'Track each exercise with sets, reps, and weights. Mark warmup sets, drop sets, and failure sets for complete accuracy.',
    },
    {
      icon: <BarChart3 />,
      title: 'Monitor Progress',
      description:
        'View detailed charts, personal records, and exercise history. See your progress over time and stay motivated.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            How
            <span className={styles.gradientText}> PeakHealth Works</span>
          </h2>
          <p className={styles.description}>
            Get started in three simple steps and transform your fitness journey
            with our intuitive workout tracking platform.
          </p>
        </div>

        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{index + 1}</div>
              <div className={styles.stepContent}>
                <div className={styles.stepIcon}>{step.icon}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.stepArrow}>
                  <ArrowRight />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            <h4>Smart Rest Timers</h4>
            <p>
              Automatic rest timers between sets to optimize your workout flow
            </p>
          </div>
          <div className={styles.feature}>
            <h4>Exercise Library</h4>
            <p>
              Comprehensive database with high-quality exercise videos and
              instructions
            </p>
          </div>
          <div className={styles.feature}>
            <h4>Personal Records</h4>
            <p>
              Track and celebrate your achievements with automatic PR detection
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
