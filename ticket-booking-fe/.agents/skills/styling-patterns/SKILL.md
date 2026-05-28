---
name: styling-patterns
description: CSS Modules and Industrial Transit design system patterns for the Bus Ticket Booking frontend. Covers CSS custom properties, module usage, color palette, typography, and animation patterns. Use when modifying styles or adding new UI components.
---

# Styling Patterns Skill

## Design System — "Industrial Transit"

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg-primary` | `#1A1A2E` | Deep navy background |
| `--color-bg-secondary` | `#16213E` | Card/panel backgrounds |
| `--color-bg-surface` | `#0F3460` | Elevated surfaces (nav, grid) |
| `--color-accent` | `#E94560` | CTA buttons, selected state |
| `--color-open` | `#2ECC71` | Available seats |
| `--color-closed` | `#4A4A6A` | Booked seats |
| `--color-text-primary` | `#EAEAEA` | Body text |
| `--color-text-secondary` | `#A0A0C0` | Labels, muted text |
| `--color-border` | `#2A2A4A` | Subtle borders |
| `--color-success` | `#2ECC71` | Success states |
| `--color-error` | `#E94560` | Error states |

### Typography

- **Headings/Nav**: `'Barlow Condensed'`, weight 600/700
- **Body/Labels/Table**: `'IBM Plex Mono'`, weight 400/500

## CSS Modules

Each component has its own `.module.css` file:

```tsx
import styles from './MyComponent.module.css';
<div className={styles.container}>...</div>
```

### Composing classes
```tsx
<div className={`${styles.seat} ${isOpen ? styles.open : styles.closed}`}>
```

## Key Patterns

- **Inputs**: `background: #0a0a1a`, dark input fields
- **Cards**: `background: var(--color-bg-secondary)`, `border-radius: 12px`
- **Buttons**: Font `Barlow Condensed`, `text-transform: uppercase`, `letter-spacing: 1px`
- **Hover effects**: `filter: brightness(1.1)` or `transform: scale(1.05)`
- **Transitions**: `transition: all 120ms ease` for subtle interactions

## Animation Patterns

- **Slide down**: `max-height` + `opacity` + `transform: translateY`
- **Toast slide in**: `translateY(20px)` → `translateY(0)` with opacity
- **Seat hover**: `scale(1.05)` + `brightness(1.15)`

## Rules

- **No inline styles** except for page-level one-off headings
- **Use CSS custom properties** from `index.css` — never hard-code colors
- **No CSS frameworks** (no Tailwind, Bootstrap, etc.)
