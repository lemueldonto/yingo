import { palette } from './palette';

/**
 * Semantic colors. There is deliberately no `debt` color: debts are never shown in
 * red, and red (`alert`) is reserved for real alerts (payment due tomorrow,
 * survival mode).
 */
export const colors = {
  background: palette.nuage,
  surface: palette.white,
  text: palette.encre,
  textMuted: palette.encreMuted,
  /** Brand accents and primary buttons. */
  brand: palette.myrtille,
  action: palette.myrtille,
  onAction: palette.white,
  /** Victories, Cabri's horns. Fill only: never text on a light background. */
  victory: palette.soleil,
  /** Progress and gains. Fill only: never text on a light background. */
  progress: palette.lagon,
  gain: palette.lagon,
  /** Celebrations, Cabri's cheeks. Fill only. */
  celebration: palette.goyave,
  /** Real alerts only. Never for a debt. */
  alert: palette.alertRed,
  onAlert: palette.white,
} as const;

export type ColorToken = keyof typeof colors;

/**
 * Text/background pairs allowed in the app. Each meets WCAG AA (4.5:1), checked by
 * tests. Soleil, Lagon and Goyave only appear as backgrounds, with ink text.
 */
export const textPairs = [
  { text: 'text', background: 'background' },
  { text: 'text', background: 'surface' },
  { text: 'textMuted', background: 'background' },
  { text: 'textMuted', background: 'surface' },
  { text: 'brand', background: 'background' },
  { text: 'onAction', background: 'action' },
  { text: 'text', background: 'victory' },
  { text: 'text', background: 'progress' },
  { text: 'text', background: 'celebration' },
  { text: 'alert', background: 'background' },
  { text: 'onAlert', background: 'alert' },
] as const satisfies readonly { text: ColorToken; background: ColorToken }[];

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 } as const;

/** Round, joyful shapes (docs/brand.md). */
export const radii = { sm: 8, md: 16, lg: 24, pill: 999 } as const;

/** Thick outlines. */
export const borderWidth = { regular: 2, thick: 3 } as const;
