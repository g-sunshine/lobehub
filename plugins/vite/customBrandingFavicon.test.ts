import { beforeEach, describe, expect, it, vi } from 'vitest';

const SAMPLE_HTML = `<head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <link rel="shortcut icon" href="/favicon-32x32.ico" />
    <link rel="manifest" href="/manifest.webmanifest" />
  </head>`;

const loadHandler = async (branding: { BRANDING_LOGO_URL: string; BRANDING_NAME: string }) => {
  vi.doMock('@lobechat/business-const/branding', () => branding);
  const { customBrandingFavicon } = await import('./customBrandingFavicon');
  const plugin = customBrandingFavicon();
  return (plugin.transformIndexHtml as { handler: (html: string) => string }).handler;
};

describe('customBrandingFavicon', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('keeps the LobeHub favicons for the default branding', async () => {
    const handler = await loadHandler({ BRANDING_LOGO_URL: '', BRANDING_NAME: 'LobeHub' });

    expect(handler(SAMPLE_HTML)).toBe(SAMPLE_HTML);
  });

  it('keeps the LobeHub favicons when a custom brand has no logo', async () => {
    const handler = await loadHandler({ BRANDING_LOGO_URL: '', BRANDING_NAME: 'AI Workstation' });

    expect(handler(SAMPLE_HTML)).toBe(SAMPLE_HTML);
  });

  it('points both favicon links at the custom logo', async () => {
    const handler = await loadHandler({
      BRANDING_LOGO_URL: '/brand/logo.png',
      BRANDING_NAME: 'AI Workstation',
    });

    const result = handler(SAMPLE_HTML);
    expect(result).toContain('<link rel="icon" href="/brand/logo.png" />');
    expect(result).toContain('<link rel="shortcut icon" href="/brand/logo.png" />');
    expect(result).not.toContain('favicon');
    // unrelated links are preserved
    expect(result).toContain('<link rel="manifest" href="/manifest.webmanifest" />');
  });

  it('escapes attribute-sensitive characters in the logo URL', async () => {
    const handler = await loadHandler({
      BRANDING_LOGO_URL: '/logo.png?a=1&b="2"',
      BRANDING_NAME: 'AI Workstation',
    });

    expect(handler(SAMPLE_HTML)).toContain('href="/logo.png?a=1&amp;b=&quot;2&quot;"');
  });
});
