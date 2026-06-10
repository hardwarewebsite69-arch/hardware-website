---
name: Industrial Precision High-Contrast
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#5a4138'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#8e7166'
  outline-variant: '#e2bfb2'
  surface-tint: '#a73a00'
  primary: '#a33900'
  on-primary: '#ffffff'
  primary-container: '#cc4900'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb599'
  secondary: '#575e70'
  on-secondary: '#ffffff'
  secondary-container: '#d9dff5'
  on-secondary-container: '#5c6274'
  tertiary: '#006b2e'
  on-tertiary: '#ffffff'
  tertiary-container: '#00873c'
  on-tertiary-container: '#f7fff3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbce'
  primary-fixed-dim: '#ffb599'
  on-primary-fixed: '#370e00'
  on-primary-fixed-variant: '#7f2b00'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#66ff8e'
  tertiary-fixed-dim: '#3de273'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005322'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-2xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

This design system blends the utilitarian efficiency of industrial design with the polished refinement of a premium SaaS product. It is inspired by modern gear engineering—think Peak Design or high-end automotive interfaces—where every element feels intentional, durable, and precise.

The aesthetic is **Modern Industrial**. It utilizes a high-contrast foundation to create a sense of authority and clarity. The brand personality is technical yet sophisticated, targeting professionals who value tools that are both functional and aesthetically superior. The emotional response is one of "calculated confidence"—the UI feels like a high-performance instrument that won't fail under pressure.

Key pillars include:
- **Clarity over Ornament:** Every border and shadow serves to define structure.
- **High-Contrast Impact:** Using "Safety Orange" sparingly against deep slates and pure whites to direct attention instantly.
- **Grid-Dominance:** A rigorous adherence to alignment that suggests engineering precision.

## Colors

The palette is anchored by high-visibility logic. 

- **Primary (Safety Orange):** Reserved for the most critical actions, alerts, and active states. It represents the "functional" highlight of the system.
- **Secondary (Deep Slate):** Used for typography, iconography, and high-impact containers. It provides the "heavy" industrial feel.
- **Background & Neutral:** A clean, airy foundation of pure White and cool Slate grays ensures the high-contrast elements have room to breathe.
- **Success (WhatsApp Green):** Used specifically for positive confirmations and communication-related statuses.

Contrast ratios must always exceed WCAG AA standards, favoring high-legibility Deep Slate text on White or Neutral backgrounds.

## Typography

The design system relies exclusively on **Inter** to maintain a systematic, neutral, and highly legible environment. 

The typographic hierarchy is aggressive. Headlines are oversized and bold (Heavy/ExtraBold) with tight letter-spacing to mimic technical documentation or high-end branding. Labels often utilize uppercase styling with slight tracking to differentiate them from body copy, acting as "metadata" for the UI. 

For mobile, headlines scale down significantly to maintain vertical rhythm, while body text remains robust at 16px-18px for maximum readability.

## Layout & Spacing

This design system uses a **Fixed Grid** philosophy for desktop to maintain the "contained instrument" look, transitioning to a fluid layout for mobile. 

The layout is built on an 8px square grid. Spacing is generous—SaaS-inspired "white space" is treated as a functional element to separate complex data sets. 

- **Desktop:** 12-column grid, 1280px max-width, 24px gutters.
- **Tablet:** 8-column grid, 24px margins.
- **Mobile:** 4-column grid, 16px margins.

Vertical rhythm is strictly maintained using the `lg` (48px) and `xl` (80px) tokens for section spacing to ensure the premium, airy feel is consistent across all pages.

## Elevation & Depth

Depth is conveyed through a "Mechanical Layering" approach. Instead of realistic shadows, we use **Premium Ambient Shadows**—highly diffused, low-opacity, and slightly tinted with the Deep Slate primary color to ground objects.

- **Level 0 (Floor):** Pure White (#FFFFFF) or Neutral (#F8FAFC).
- **Level 1 (Cards):** Low-contrast outlines (1px solid #E2E8F0) with a very subtle shadow (0px 4px 20px rgba(17, 24, 39, 0.05)).
- **Level 2 (Dropdowns/Modals):** Defined borders with a more pronounced, sharp shadow to simulate an object physically sitting "on top" of the workbench.

Interactive elements (buttons) do not use elevation to show "pressed" states; instead, they use high-contrast color shifts and internal borders to simulate mechanical tactile feedback.

## Shapes

The shape language is "Subtle Precision." We avoid fully circular or organic corners in favor of a **Soft (0.25rem - 0.5rem)** radius. This mimics the chamfered edges of machined metal or molded plastic.

- **Default (rounded-md):** 0.25rem (4px) for small components like checkboxes and input fields.
- **Large (rounded-lg):** 0.5rem (8px) for cards, containers, and main buttons.
- **Extra Large (rounded-xl):** 0.75rem (12px) for large modals or feature sections.

Consistency in corner radius is paramount to maintaining the industrial aesthetic. Avoid "pill" shapes unless used for specialized status chips.

## Components

### Buttons
- **Primary:** Background #EA580C, Text #FFFFFF, Bold weight. On hover, darken to a burnt orange.
- **Secondary:** Background #111827, Text #FFFFFF. On hover, slight opacity reduction (90%).
- **Ghost:** Transparent background, 1px border #E2E8F0, Text #111827.

### Input Fields
- High-contrast 1px borders (#E2E8F0). Focus state uses a 2px #111827 border—never the primary orange—to keep the focus professional and steady. Labels are always `label-md` (uppercase) positioned above the field.

### Chips & Badges
- Use for status. **Success** uses #25D366 with white text. **Neutral** uses #F1F5F9 background with #475569 text. Rectangular with 4px radius.

### Cards
- White background, 1px #E2E8F0 border. Headers within cards should have a subtle bottom border to separate content, reinforcing the grid-based architecture.

### Data Tables
- The "Industrial" heart of the system. Use thin horizontal rules only. Header row should have a light #F8FAFC background and `label-sm` bold typography for columns.

### Specific Components: "The Gear Tag"
- A unique component for this system: A small, high-contrast tag with a monospaced ID font, used for serial numbers, IDs, or SKU references, reinforcing the industrial gear theme.