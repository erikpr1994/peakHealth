import { Code, Globe, Rocket, TestTube } from 'lucide-react';

import { EnvironmentKey } from './types';

export const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'analytics', label: 'Analytics & Reporting' },
  { value: 'ui_ux', label: 'UI/UX Features' },
  { value: 'ai_ml', label: 'AI & Machine Learning' },
  { value: 'corporate', label: 'Corporate Features' },
  { value: 'integrations', label: 'Integrations' },
  { value: 'performance', label: 'Performance' },
];

export const getEnvironmentIcon = (env: string) => {
  switch (env) {
    case 'development':
      return Code;
    case 'staging':
      return TestTube;
    case 'production':
      return Rocket;
    default:
      return Globe;
  }
};

export const getEnvironmentColor = (env: string) => {
  switch (env) {
    case 'development':
      return 'outline';
    case 'staging':
      return 'secondary';
    case 'production':
      return 'default';
    default:
      return 'outline';
  }
};

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const ALL_ENVIRONMENTS: EnvironmentKey[] = [
  'development',
  'staging',
  'production',
];
