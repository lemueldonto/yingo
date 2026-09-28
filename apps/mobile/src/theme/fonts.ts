import { Fredoka_600SemiBold, Fredoka_700Bold } from '@expo-google-fonts/fredoka';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';

/** Font files loaded at startup, before the splash screen hides. */
export const fontAssets = {
  Fredoka_600SemiBold,
  Fredoka_700Bold,
  Nunito_400Regular,
  Nunito_700Bold,
};

export const fonts = {
  heading: 'Fredoka_700Bold',
  headingSemiBold: 'Fredoka_600SemiBold',
  body: 'Nunito_400Regular',
  bodyBold: 'Nunito_700Bold',
} as const;

/**
 * Type scale. Sizes are the base at the default system text size; React Native
 * scales them with the user's font size setting (allowFontScaling stays on).
 */
export const typography = {
  title: { fontFamily: fonts.heading, fontSize: 28, lineHeight: 34 },
  heading: { fontFamily: fonts.headingSemiBold, fontSize: 20, lineHeight: 26 },
  body: { fontFamily: fonts.body, fontSize: 16, lineHeight: 22 },
  bodyBold: { fontFamily: fonts.bodyBold, fontSize: 16, lineHeight: 22 },
  caption: { fontFamily: fonts.body, fontSize: 13, lineHeight: 18 },
} as const;
