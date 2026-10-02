import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { useGlobalStore } from '@/store/global';

import {
  HOME_QUICK_GUIDE_ID,
  HOME_QUICK_GUIDE_STEPS,
  useHomeQuickGuide,
} from '../useHomeQuickGuide';

const original = {
  dismissedBannerIds: useGlobalStore.getState().status.dismissedBannerIds,
  isStatusInit: useGlobalStore.getState().isStatusInit,
};

const seed = ({
  dismissedBannerIds = [],
  isStatusInit = true,
}: {
  dismissedBannerIds?: string[];
  isStatusInit?: boolean;
}) =>
  useGlobalStore.setState((state) => ({
    isStatusInit,
    status: { ...state.status, dismissedBannerIds },
  }));

afterEach(() => {
  useGlobalStore.setState((state) => ({
    isStatusInit: original.isStatusInit,
    status: { ...state.status, dismissedBannerIds: original.dismissedBannerIds },
  }));
});

describe('useHomeQuickGuide', () => {
  it('walks a chat in order: model, question, answer', () => {
    expect(HOME_QUICK_GUIDE_STEPS).toEqual(['model', 'question', 'answer']);
  });

  it('shows the guide to a viewer who has not closed it', () => {
    seed({});
    const { result } = renderHook(() => useHomeQuickGuide());

    expect(result.current.visible).toBe(true);
  });

  it('stays closed once the viewer dismisses it', () => {
    seed({ dismissedBannerIds: ['other-banner'] });
    const { result } = renderHook(() => useHomeQuickGuide());

    act(() => result.current.dismiss());

    expect(result.current.visible).toBe(false);
    expect(useGlobalStore.getState().status.dismissedBannerIds).toEqual([
      'other-banner',
      HOME_QUICK_GUIDE_ID,
    ]);
  });

  it('does not record the dismissal twice', () => {
    seed({ dismissedBannerIds: [HOME_QUICK_GUIDE_ID] });
    const { result } = renderHook(() => useHomeQuickGuide());

    act(() => result.current.dismiss());

    expect(result.current.visible).toBe(false);
    expect(useGlobalStore.getState().status.dismissedBannerIds).toEqual([HOME_QUICK_GUIDE_ID]);
  });

  it('waits for persisted status so a dismissed guide never flashes', () => {
    seed({ isStatusInit: false });
    const { result } = renderHook(() => useHomeQuickGuide());

    expect(result.current.visible).toBe(false);
  });
});
