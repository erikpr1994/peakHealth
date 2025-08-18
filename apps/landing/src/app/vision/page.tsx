import { Heart, Target, Users, Globe, Shield, TrendingUp } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

import styles from './VisionPage.module.css';

export const metadata: Metadata = {
  title: 'Our Vision - Peak Health',
  description:
    'Discover our mission to transform global health through integrative wellness and preventive care. Learn why PeakHealth exists and our commitment to holistic health.',
  keywords:
    'health vision, integrative wellness, preventive care, holistic health, fitness mission',
  openGraph: {
    title: 'Our Vision - Peak Health',
    description:
      'Discover our mission to transform global health through integrative wellness and preventive care.',
    type: 'website',
  },
};

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

const VisionPage = (): React.JSX.Element => {
  const visionPillars = [
    {
      icon: <Heart />,
      title: 'Holistic Health',
      description:
        'We believe in treating the whole person, not just symptoms. Our vision encompasses physical, mental, and lifestyle factors for complete wellness.',
    },
    {
      icon: <Target />,
      title: 'Preventive Focus',
      description:
        'Instead of waiting for health issues to arise, we empower people to build healthy habits and prevent problems before they start.',
    },
    {
      icon: <Globe />,
      title: 'Global Impact',
      description:
        'Our vision extends beyond individual users to create a global movement toward better health practices and awareness.',
    },
    {
      icon: <Shield />,
      title: 'Evidence-Based',
      description:
        'Every approach and recommendation is grounded in scientific research and proven health principles.',
    },
    {
      icon: <TrendingUp />,
      title: 'Continuous Evolution',
      description:
        'We constantly evolve our understanding and approach based on the latest health research and user needs.',
    },
    {
      icon: <Users />,
      title: 'Accessible Health',
      description:
        'We believe that comprehensive health and fitness should be accessible to everyone, regardless of their starting point.',
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Our Vision for
            <span className={styles.gradientText}> Global Health</span>
          </h1>
          <p className={styles.heroDescription}>
            Health today is severely deteriorated and focused on solving
            problems after they occur rather than addressing the root cause.
            That's why we want to help expand global and integrative health.
          </p>
          <p className={styles.heroSubtitle}>
            We're building a future where health is proactive, holistic, and
            accessible to everyone.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.missionContent}>
          <h2 className={styles.sectionTitle}>Why PeakHealth Exists</h2>
          <div className={styles.missionGrid}>
            <div className={styles.missionCard}>
              <h3>The Problem</h3>
              <p>
                Today's health systems focus on treating symptoms after they
                appear, rather than preventing issues at their root. This
                reactive approach leads to increased healthcare costs, reduced
                quality of life, and missed opportunities for true wellness.
              </p>
            </div>
            <div className={styles.missionCard}>
              <h3>Our Solution</h3>
              <p>
                PeakHealth empowers individuals to take control of their health
                journey through comprehensive fitness and wellness approaches.
                We believe in building sustainable health habits that address
                the root causes of health issues, not just their symptoms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Pillars */}
      <section className={styles.pillars}>
        <div className={styles.pillarsContent}>
          <h2 className={styles.sectionTitle}>Our Core Principles</h2>
          <div className={styles.pillarsGrid}>
            {visionPillars.map((pillar, index) => (
              <div key={index} className={styles.pillarCard}>
                <div className={styles.pillarIcon}>{pillar.icon}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarDescription}>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className={styles.impact}>
        <div className={styles.impactContent}>
          <h2 className={styles.sectionTitle}>Our Impact Vision</h2>
          <div className={styles.impactGrid}>
            <div className={styles.impactItem}>
              <h3>Individual Level</h3>
              <p>
                Help millions of people build sustainable health habits, prevent
                chronic diseases, and achieve their wellness goals through
                comprehensive fitness and wellness approaches.
              </p>
            </div>
            <div className={styles.impactItem}>
              <h3>Community Level</h3>
              <p>
                Create supportive networks where people can share knowledge,
                motivate each other, and build healthier communities together.
              </p>
            </div>
            <div className={styles.impactItem}>
              <h3>Global Level</h3>
              <p>
                Contribute to a paradigm shift in how society approaches health,
                moving from reactive treatment to proactive prevention and
                comprehensive wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Join Our Mission</h2>
          <p>
            Be part of the movement to transform global health. Start your
            journey with PeakHealth and help us build a healthier future for
            everyone.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/" className={styles.primaryButton}>
              Get Started
            </Link>
            <Link href="/features" className={styles.secondaryButton}>
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisionPage;
