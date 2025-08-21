import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import React from 'react';

// Mock CSS Modules
vi.mock('*.module.css', () => ({
  default: {
    // Add common class names that might be used
    container: 'container',
    header: 'header',
    title: 'title',
    subtitle: 'subtitle',
    content: 'content',
    comingSoonSection: 'comingSoonSection',
    comingSoonTitle: 'comingSoonTitle',
    comingSoonDescription: 'comingSoonDescription',
    featuresCard: 'featuresCard',
    featuresText: 'featuresText',
    features: 'features',
    feature: 'feature',
    featureIcon: 'featureIcon',
    featureTitle: 'featureTitle',
    featureDescription: 'featureDescription',
    ctaSection: 'ctaSection',
    ctaTitle: 'ctaTitle',
    ctaDescription: 'ctaDescription',
    ctaButton: 'ctaButton',
    privacy: 'privacy',
    privacyPrinciples: 'privacyPrinciples',
    principle: 'principle',
    principleIcon: 'principleIcon',
    principleTitle: 'principleTitle',
    principleDescription: 'principleDescription',
    commitmentCard: 'commitmentCard',
    commitmentText: 'commitmentText',
    contactSection: 'contactSection',
    contactTitle: 'contactTitle',
    contactDescription: 'contactDescription',
    contactButton: 'contactButton',
    help: 'help',
    helpCategories: 'helpCategories',
    category: 'category',
    categoryIcon: 'categoryIcon',
    categoryTitle: 'categoryTitle',
    categoryDescription: 'categoryDescription',
    roadmap: 'roadmap',
    roadmapFeatures: 'roadmapFeatures',
    terms: 'terms',
    termsSections: 'termsSections',
    section: 'section',
    sectionIcon: 'sectionIcon',
    sectionTitle: 'sectionTitle',
    sectionDescription: 'sectionDescription',
  },
}));

// Mock next-intl Link component
vi.mock('@/i18n/navigation', () => ({
  Link: vi.fn(({ children, href, className, ...props }) => {
    return React.createElement('a', { href, className, ...props }, children);
  }),
}));

// Ensure Supabase env vars exist during tests (for shared utilities if referenced)
process.env.NEXT_PUBLIC_SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321';
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'test-anon-key';
