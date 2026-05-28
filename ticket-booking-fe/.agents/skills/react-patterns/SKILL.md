---
name: react-patterns
description: React component patterns and TypeScript usage for the Bus Ticket Booking frontend. Covers functional components, hooks, prop typing, and component composition. Use when creating or modifying React components.
---

# React Patterns Skill

## Component Structure

All components are functional components with TypeScript:

```typescript
interface MyComponentProps {
  title: string;
  onAction: (id: number) => void;
}

export default function MyComponent({ title, onAction }: MyComponentProps) {
  return <div>{title}</div>;
}
```

## Component Organization

Each component gets its own folder:
```
components/
  MyComponent/
    MyComponent.tsx        # Component logic
    MyComponent.module.css # Scoped styles
```

## Common Hooks Usage

- `useState` — Local component state (form inputs, toggle states)
- `useReducer` — Complex state with multiple sub-values (via Context)
- `useEffect` — Side effects (localStorage init on mount)
- `useCallback` — Memoized callbacks (toast functions)
- `useContext` — Access global ticket state

## Event Handling

```typescript
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { ... };
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { ... };
const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); ... };
```

## Conditional Rendering

```tsx
{isEditing ? <EditView /> : <DisplayView />}
{selectedSeat !== null && <BookingForm seatNumber={selectedSeat} />}
```

## Key Rules

- No inline styles except for one-off page heading overrides
- All styles in CSS Modules
- Export components as `default`
- Props interfaces defined in the same file
