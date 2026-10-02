import { beforeEach, describe, expect, it, vi } from 'vitest';

const loadGetFaviconPath = async ({
  isCustomBranding,
  logoUrl,
}: {
  isCustomBranding: boolean;
  logoUrl: string;
}) => {
  vi.doMock('@lobechat/business-const', () => ({ BRANDING_LOGO_URL: logoUrl }));
  vi.doMock('@/const/version', () => ({ isCustomBranding }));
  const { getFaviconPath } = await import('./FaviconProvider');
  return getFaviconPath;
};

describe('getFaviconPath', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('picks the LobeHub per-state icon for the default branding', async () => {
    const getFaviconPath = await loadGetFaviconPath({ isCustomBranding: false, logoUrl: '' });

    expect(getFaviconPath('default', false)).toBe('/favicon.ico');
    expect(getFaviconPath('progress', false, '32x32')).toBe('/favicon-32x32-progress.ico');
    expect(getFaviconPath('done', true)).toBe('/favicon-done-dev.ico');
  });

  it('keeps the custom logo in every state', async () => {
    const getFaviconPath = await loadGetFaviconPath({
      isCustomBranding: true,
      logoUrl: '/brand/logo.png',
    });

    expect(getFaviconPath('default', false)).toBe('/brand/logo.png');
    expect(getFaviconPath('progress', true, '32x32')).toBe('/brand/logo.png');
    expect(getFaviconPath('error', false)).toBe('/brand/logo.png');
  });

  it('falls back to the per-state icons when a custom brand has no logo', async () => {
    const getFaviconPath = await loadGetFaviconPath({ isCustomBranding: true, logoUrl: '' });

    expect(getFaviconPath('progress', false)).toBe('/favicon-progress.ico');
  });
});
