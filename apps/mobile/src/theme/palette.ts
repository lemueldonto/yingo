// Brand palette from docs/brand.md. Private to the theme: features use tokens.ts.
export const palette = {
  myrtille: '#4B3BFF',
  soleil: '#FFC23D',
  lagon: '#1FC7B6',
  goyave: '#FF8A7A',
  encre: '#1C1B3A',
  nuage: '#F5F6FF',
  white: '#FFFFFF',
  // Muted ink for secondary text (6.1:1 on nuage).
  encreMuted: '#5A5980',
  // Not a brand color: reserved for real alerts (docs/brand.md).
  alertRed: '#D02A1E',
} as const;
