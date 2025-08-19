import { describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '../../../test/test-utils';
import { act } from '@testing-library/react';
import React from 'react';

// Mock setRequestLocale to avoid client component error in tests
vi.mock('next-intl/server', () => ({
  setRequestLocale: vi.fn(),
}));

import VisionPage from './page';

describe('VisionPage', () => {
  it('renders the vision page with correct content', async () => {
    await act(async () => {
      render(<VisionPage params={Promise.resolve({ locale: 'en' })} />);
    });

    await waitFor(() => {
      // Check for main title
      expect(screen.getByText(/Our Vision for/)).toBeInTheDocument();
      expect(screen.getByText(/Global Health/)).toBeInTheDocument();

      // Check for hero description
      expect(
        screen.getByText(/Health today is severely deteriorated/)
      ).toBeInTheDocument();

      // Check for mission section
      expect(screen.getByText('Why PeakHealth Exists')).toBeInTheDocument();

      // Check for problem and solution cards
      expect(screen.getByText('The Problem')).toBeInTheDocument();
      expect(screen.getByText('Our Solution')).toBeInTheDocument();

      // Check for pillars section
      expect(screen.getByText('Our Core Principles')).toBeInTheDocument();

      // Check for individual pillars
      expect(screen.getByText('Holistic Health')).toBeInTheDocument();
      expect(screen.getByText('Preventive Focus')).toBeInTheDocument();
      expect(screen.getByText('Global Impact')).toBeInTheDocument();
      expect(screen.getByText('Evidence-Based')).toBeInTheDocument();
      expect(screen.getByText('Continuous Evolution')).toBeInTheDocument();
      expect(screen.getByText('Accessible Health')).toBeInTheDocument();

      // Check for impact section
      expect(screen.getByText('Our Impact Vision')).toBeInTheDocument();

      // Check for impact levels
      expect(screen.getByText('Individual Level')).toBeInTheDocument();
      expect(screen.getByText('Community Level')).toBeInTheDocument();
      expect(screen.getByText('Global Level')).toBeInTheDocument();

      // Check for CTA section
      expect(screen.getByText('Join Our Mission')).toBeInTheDocument();
      expect(screen.getByText('Get Started')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });
  });

  it('renders all vision pillars with descriptions', async () => {
    await act(async () => {
      render(<VisionPage params={Promise.resolve({ locale: 'en' })} />);
    });

    await waitFor(() => {
      // Check that all pillar descriptions are present
      expect(
        screen.getByText(/We believe in treating the whole person/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Instead of waiting for health issues to arise/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Our vision extends beyond individual users/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Every approach and recommendation is grounded/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/We constantly evolve our understanding/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/We believe that comprehensive health and fitness/)
      ).toBeInTheDocument();
    });
  });

  it('renders impact descriptions', async () => {
    await act(async () => {
      render(<VisionPage params={Promise.resolve({ locale: 'en' })} />);
    });

    await waitFor(() => {
      // Check impact descriptions
      expect(
        screen.getByText(
          /Help millions of people build sustainable health habits/
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Create supportive networks where people can share/)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Contribute to a paradigm shift in how society/)
      ).toBeInTheDocument();
    });
  });

  it('renders with Spanish locale parameter', async () => {
    await act(async () => {
      render(<VisionPage params={Promise.resolve({ locale: 'es' })} />, {
        locale: 'es',
      });
    });

    await waitFor(() => {
      // Check that the component renders successfully with Spanish locale
      // The exact translations may depend on the test environment setup
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText(/Vision for|Visión para/)).toBeInTheDocument();
      expect(
        screen.getByText(/Global Health|Salud Global/)
      ).toBeInTheDocument();

      // Check that main sections are present
      expect(
        screen.getByText(/Why PeakHealth Exists|Por Qué Existe PeakHealth/)
      ).toBeInTheDocument();
      expect(screen.getByText(/The Problem|El Problema/)).toBeInTheDocument();
      expect(
        screen.getByText(/Our Solution|Nuestra Solución/)
      ).toBeInTheDocument();

      // Check that pillars section is present
      expect(
        screen.getByText(
          /Our Core Principles|Nuestros Principios Fundamentales/
        )
      ).toBeInTheDocument();

      // Check that CTA section is present
      expect(
        screen.getByText(/Join Our Mission|Únete a Nuestra Misión/)
      ).toBeInTheDocument();
    });
  });
});
