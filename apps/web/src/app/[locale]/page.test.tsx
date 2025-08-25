import { redirect } from 'next/navigation';
import { use } from 'react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import LocalePage from './page';

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}));

vi.mock('react', () => ({
  ...vi.importActual('react'),
  use: vi.fn(),
}));

describe('LocalePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should redirect to dashboard with English locale', (): void => {
    (use as ReturnType<typeof vi.fn>).mockReturnValue({ locale: 'en' });

    LocalePage({ params: Promise.resolve({ locale: 'en' }) });

    expect(use).toHaveBeenCalledWith(Promise.resolve({ locale: 'en' }));
    expect(redirect).toHaveBeenCalledWith('/en/dashboard');
  });

  it('should redirect to dashboard with Spanish locale', (): void => {
    (use as ReturnType<typeof vi.fn>).mockReturnValue({ locale: 'es' });

    LocalePage({ params: Promise.resolve({ locale: 'es' }) });

    expect(use).toHaveBeenCalledWith(Promise.resolve({ locale: 'es' }));
    expect(redirect).toHaveBeenCalledWith('/es/dashboard');
  });

  it('should handle params promise correctly', (): void => {
    const paramsPromise = Promise.resolve({ locale: 'en' });
    (use as ReturnType<typeof vi.fn>).mockReturnValue({ locale: 'en' });

    LocalePage({ params: paramsPromise });

    expect(use).toHaveBeenCalledWith(paramsPromise);
  });

  it('should always redirect to dashboard path', (): void => {
    (use as ReturnType<typeof vi.fn>).mockReturnValue({ locale: 'en' });

    LocalePage({ params: Promise.resolve({ locale: 'en' }) });

    expect(redirect).toHaveBeenCalledWith('/en/dashboard');
  });
});
