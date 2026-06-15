# Design

## Visual Principles
- **Industrial Precision**: Sharp corners (radius ≤ 8px), clear borders (1px solid), and high-contrast typography.
- **Trust-First Hierarchy**: Lead with credibility (years in business, contractor count, ISO certs) before pushing products.
- **Kenyan Relevance**: Visuals should feel grounded in the local construction context (vibrant but professional, mobile-optimized).

## Color Palette (OKLCH)
- **Primary (Accent)**: `oklch(62% 0.22 35)` — #ea580c (Industrial Orange). Used for primary CTAs and key brand elements.
- **Ink (Text)**: `oklch(22% 0.02 260)` — #111827 (Deep Charcoal). High contrast for readability.
- **Surface (Background)**: `oklch(100% 0 0)` — #ffffff (Pure White).
- **Muted**: `oklch(96% 0.01 260)` — #f3f4f6 (Light Gray). Used for section backgrounds and secondary cards.
- **Success (WhatsApp)**: `oklch(65% 0.15 150)` — #25d366 (WhatsApp Green). Reserved strictly for WhatsApp CTAs.

## Typography
- **Headings**: Inter, 700-900 weight. Letter-spacing: -0.02em to -0.04em.
- **Body**: Inter, 400-500 weight. Line-height: 1.6.
- **Labels**: Inter, 600 weight, uppercase, tracked 0.05em (used sparingly).

## Components
- **Primary CTA**: Large, bold, Industrial Orange background, white text.
- **WhatsApp Button**: Sticky floating button (bottom-right) + inline buttons in product/hero sections.
- **Product Card**: Clean 1px border, no shadow (or very subtle), focused on title and "Request Quote" (WhatsApp).
- **Trust Badges**: Simple icons with bold labels.

## Spacing & Rhythm
- Generous section padding (py-20 to py-32).
- Tight grouping of related elements (gap-4 for card content).
- Consistent 65-75ch max-width for prose.

## Motion
- Subtle "Industrial" reveals: 0.4s ease-out-expo transforms (slight Y shift).
- No over-the-top bounce or elastic effects.
- Direct, functional transitions.
