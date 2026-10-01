import type { ThemeConfig } from 'antd';

/**
 * Deep purple neutral tokens for the dark appearance.
 *
 * Fills the same slots `@lobehub/ui`'s `generateColorNeutralPalette` derives from a
 * neutral scale in dark mode, so backgrounds, borders, fills and text shift to
 * purple together instead of leaving gray seams between them.
 */
export const DEEP_PURPLE_DARK_TOKEN: ThemeConfig['token'] = {
  colorBgContainer: '#2a1a55',
  colorBgElevated: '#33215f',
  colorBgLayout: '#1e1240',
  colorBgMask: 'rgba(12, 6, 32, 0.5)',
  colorBgSpotlight: '#4c3380',
  colorBorder: '#40296f',
  colorBorderSecondary: '#33215f',
  colorFill: 'rgba(210, 190, 255, 0.16)',
  colorFillQuaternary: 'rgba(210, 190, 255, 0.02)',
  colorFillSecondary: 'rgba(210, 190, 255, 0.1)',
  colorFillTertiary: 'rgba(210, 190, 255, 0.06)',
  colorText: '#ffffff',
  colorTextLightSolid: '#1e1240',
  colorTextQuaternary: '#6f5aa3',
  colorTextSecondary: '#cbbfee',
  colorTextTertiary: '#9a88c9',
};
