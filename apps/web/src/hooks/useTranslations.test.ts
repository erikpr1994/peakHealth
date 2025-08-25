import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useTranslations as useNextIntlTranslations } from 'next-intl';
import { useTranslations } from './useTranslations';

// Mock next-intl's useTranslations
vi.mock('next-intl', () => ({
  useTranslations: vi.fn(),
}));

const mockUseNextIntlTranslations = useNextIntlTranslations as ReturnType<
  typeof vi.fn
>;

describe('useTranslations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call next-intl useTranslations with the provided namespace', () => {
    const mockTranslations = vi.fn();
    mockUseNextIntlTranslations.mockReturnValue(mockTranslations);

    const { result } = renderHook(() => useTranslations('navigation'));

    expect(mockUseNextIntlTranslations).toHaveBeenCalledWith('navigation');
    expect(result.current).toBe(mockTranslations);
  });

  it('should call next-intl useTranslations without namespace when not provided', () => {
    const mockTranslations = vi.fn();
    mockUseNextIntlTranslations.mockReturnValue(mockTranslations);

    const { result } = renderHook(() => useTranslations());

    expect(mockUseNextIntlTranslations).toHaveBeenCalledWith(undefined);
    expect(result.current).toBe(mockTranslations);
  });

  it('should return the same function reference as next-intl useTranslations', () => {
    const mockTranslations = vi.fn();
    mockUseNextIntlTranslations.mockReturnValue(mockTranslations);

    const { result } = renderHook(() => useTranslations('common'));

    expect(result.current).toBe(mockTranslations);
  });
});
