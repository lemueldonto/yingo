# Spec Delta

## Purpose

Provides the brand's colors and fonts as semantic tokens that make the product rules (debts never in red, readable contrast) the default rather than a matter of discipline.

## ADDED Requirements

### Requirement: Semantic tokens over the brand palette
Features SHALL use semantic tokens (brand, action, victory, progress, gain, celebration, text, background, alert) rather than raw palette colors. The raw palette SHALL match `docs/brand.md`: Myrtille `#4B3BFF`, Soleil `#FFC23D`, Lagon `#1FC7B6`, Goyave `#FF8A7A`, Encre `#1C1B3A`, Nuage `#F5F6FF`.

#### Scenario: Feature imports a raw color
- **WHEN** code outside the theme imports a raw palette value
- **THEN** the lint check fails

### Requirement: Red is reserved for real alerts
The theme SHALL expose exactly one red, `alert`, documented as reserved for real alerts (payment due tomorrow, survival mode). The theme SHALL NOT expose any debt-specific color token.

#### Scenario: No debt color
- **WHEN** a developer looks for a color to display a debt
- **THEN** no `debt` token exists and the alert token's documentation forbids that use

### Requirement: Text contrast
Text color and background pairs offered by the theme SHALL meet WCAG AA contrast (4.5:1 for body text). Soleil and Lagon SHALL NOT be offered as text colors on a light background.

#### Scenario: Low-contrast pair
- **WHEN** a text-on-background pair is defined in the theme
- **THEN** a unit test verifies its contrast ratio is at least 4.5:1

### Requirement: Brand fonts
Headings SHALL use Fredoka and body text SHALL use Nunito, loaded before the first screen is shown, and text SHALL scale with the system font size setting.

#### Scenario: App start
- **WHEN** the app starts
- **THEN** no text renders in a fallback font once the first screen appears

### Requirement: Light mode only
The app SHALL render in light mode regardless of the system setting in the MVP.

#### Scenario: System in dark mode
- **WHEN** the phone is in dark mode
- **THEN** the app shows the Nuage background and Encre text
