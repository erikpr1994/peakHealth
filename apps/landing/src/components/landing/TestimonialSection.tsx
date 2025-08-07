import { Star, Quote } from 'lucide-react';

import styles from './TestimonialSection.module.css';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Fitness Enthusiast',
    avatar: '/avatars/sarah.jpg',
    content:
      'Peak Health has completely transformed my fitness journey. The tracking features are incredible and the community support keeps me motivated every day.',
    rating: 5,
  },
  {
    name: 'Mike Chen',
    role: 'Personal Trainer',
    avatar: '/avatars/mike.jpg',
    content:
      'As a trainer, I love how Peak Health helps me manage my clients and track their progress. The analytics are comprehensive and the interface is intuitive.',
    rating: 5,
  },
  {
    name: 'Emma Rodriguez',
    role: 'Marathon Runner',
    avatar: '/avatars/emma.jpg',
    content:
      "The goal setting and progress tracking features are exactly what I needed for my marathon training. I've never been more organized with my workouts.",
    rating: 5,
  },
];

export const TestimonialSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Loved by
            <span className={styles.gradientText}> thousands of users</span>
          </h2>
          <p className={styles.subtitle}>
            Join our community of fitness enthusiasts who have transformed their
            lives with Peak Health.
          </p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonial}>
              <div className={styles.quote}>
                <Quote className={styles.quoteIcon} />
              </div>

              <div className={styles.rating}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className={styles.star} />
                ))}
              </div>

              <p className={styles.content}>{testimonial.content}</p>

              <div className={styles.author}>
                <div className={styles.avatar}>
                  <div className={styles.avatarPlaceholder}>
                    {testimonial.name
                      .split(' ')
                      .map(n => n[0])
                      .join('')}
                  </div>
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.name}>{testimonial.name}</div>
                  <div className={styles.role}>{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNumber}>4.9/5</div>
            <div className={styles.statLabel}>Average Rating</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>50K+</div>
            <div className={styles.statLabel}>Happy Users</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};
