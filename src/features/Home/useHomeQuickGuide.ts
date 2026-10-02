import { useCallback } from 'react';

import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';

export const HOME_QUICK_GUIDE_ID = 'home-quick-guide';

/** The three moves of a chat, in the order they happen. */
export const HOME_QUICK_GUIDE_STEPS = ['model', 'question', 'answer'] as const;

/**
 * Dismissal is stored with the other home banners, so a guide the viewer has
 * closed stays closed across reloads.
 */
export const useHomeQuickGuide = () => {
  // Wait for the persisted status to hydrate so a dismissed guide never flashes.
  const isStatusInit = useGlobalStore(systemStatusSelectors.isStatusInit);
  const dismissed = useGlobalStore(systemStatusSelectors.isBannerDismissed(HOME_QUICK_GUIDE_ID));
  const updateSystemStatus = useGlobalStore((s) => s.updateSystemStatus);

  const dismiss = useCallback(() => {
    const current = useGlobalStore.getState().status.dismissedBannerIds || [];
    if (current.includes(HOME_QUICK_GUIDE_ID)) return;
    updateSystemStatus({ dismissedBannerIds: [...current, HOME_QUICK_GUIDE_ID] });
  }, [updateSystemStatus]);

  return { dismiss, visible: Boolean(isStatusInit) && !dismissed };
};
