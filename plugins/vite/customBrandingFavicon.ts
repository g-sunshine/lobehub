// Deep import on purpose: see customBrandingLoadingScreen.ts — branding.ts is
// the dependency-free leaf Node's config-time loader can resolve.
import { BRANDING_LOGO_URL, BRANDING_NAME } from '@lobechat/business-const/branding';
import type { Plugin } from 'vite';

const FAVICON_LINK = /<link\s+rel="(?:shortcut )?icon"[^>]*>/g;

const escapeAttribute = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;');

/**
 * Point the static favicon links at the custom brand logo, so white-label
 * deployments never show the LobeHub icon in the tab before the SPA boots.
 * No-op for the default branding or when no logo is configured.
 */
export const customBrandingFavicon = (): Plugin => ({
  name: 'custom-branding-favicon',
  transformIndexHtml: {
    handler(html) {
      if (BRANDING_NAME === 'LobeHub' || !BRANDING_LOGO_URL) return html;

      const href = `href="${escapeAttribute(BRANDING_LOGO_URL)}"`;

      return html.replaceAll(FAVICON_LINK, (tag) => tag.replace(/href="[^"]*"/, href));
    },
    order: 'pre',
  },
});
