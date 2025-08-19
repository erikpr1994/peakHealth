import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useWorkoutNavigation } from './useWorkoutNavigation';

// Mock next/navigation
const mockPush = vi.fn();
const mockBack = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}));

describe('useWorkoutNavigation', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  it('should return navigation functions', (): void => {
    const { result } = renderHook(() => useWorkoutNavigation());

    expect(result.current.navigate).toBeDefined();
    expect(result.current.goToRoutines).toBeDefined();
    expect(result.current.goToDashboard).toBeDefined();
    expect(result.current.goToCalendar).toBeDefined();
    expect(result.current.goBack).toBeDefined();
  });

  it('should navigate to routines when goToRoutines is called', (): void => {
    const { result } = renderHook(() => useWorkoutNavigation());

    result.current.goToRoutines();

    expect(mockPush).toHaveBeenCalledWith('/routines');
  });

  it('should navigate to dashboard when goToDashboard is called', (): void => {
    const { result } = renderHook(() => useWorkoutNavigation());

    result.current.goToDashboard();

    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('should navigate to calendar when goToCalendar is called', (): void => {
    const { result } = renderHook(() => useWorkoutNavigation());

    result.current.goToCalendar();

    expect(mockPush).toHaveBeenCalledWith('/calendar');
  });

  it('should go back when goBack is called', (): void => {
    const { result } = renderHook(() => useWorkoutNavigation());

    result.current.goBack();

    expect(mockBack).toHaveBeenCalled();
  });

  it('should navigate to custom page when navigate is called', (): void => {
    const { result } = renderHook(() => useWorkoutNavigation());

    result.current.navigate('exercises');

    expect(mockPush).toHaveBeenCalledWith('/exercises');
  });
});
