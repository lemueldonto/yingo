import { describe, expect, it } from 'vitest';

import { colors, textPairs } from '../tokens';

// WCAG 2.x relative luminance and contrast ratio.
function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const value = parseInt(hex.slice(i, i + 2), 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (light + 0.05) / (dark + 0.05);
}

describe('theme contrast', () => {
  it.each(textPairs)('$text on $background meets WCAG AA (4.5:1)', ({ text, background }) => {
    expect(contrast(colors[text], colors[background])).toBeGreaterThanOrEqual(4.5);
  });

  it('never offers fill-only colors as text on a light background', () => {
    const fillOnly = ['victory', 'progress', 'gain', 'celebration'];
    expect(textPairs.filter((pair) => fillOnly.includes(pair.text))).toEqual([]);
  });

  it('has exactly one red token and no debt token', () => {
    expect(Object.keys(colors)).not.toContain('debt');
    expect(Object.values(colors).filter((value) => value === colors.alert)).toHaveLength(1);
  });
});
