---
name: component-structure
description: Component folder structure and composition patterns for the Bus Ticket Booking frontend. Covers file organization, component hierarchy, and reusability guidelines. Use when creating new components or restructuring existing ones.
---

# Component Structure Skill

## Folder Organization

```
src/
  components/         # Reusable UI components
    Navbar/
    SeatMap/
    BookingForm/
    Dashboard/
    Toast/
  context/            # Global state (TicketContext)
  pages/              # Page-level components (compose multiple components)
  types/              # TypeScript interfaces
  utils/              # Helper functions
```

## Component Hierarchy

```
App
├── Navbar              (persistent across routes)
├── ReservationPage     (page)
│   ├── SeatMap         (component)
│   │   └── Seat        (component, per seat)
│   ├── BookingForm     (component, conditional)
│   └── Toast           (component)
└── DashboardPage       (page)
    ├── Dashboard       (component)
    │   └── PassengerRow (component, per row)
    └── Toast           (component)
```

## Component Roles

### Pages (`src/pages/`)
- Compose multiple components
- Wire up context (useTickets)
- Handle top-level state (selectedSeat)
- Pass callbacks down as props

### Components (`src/components/`)
- Focused, reusable units
- Receive data and callbacks via props
- No direct context access (prefer props from pages)
- Exception: Dashboard uses `useNavigate` for empty state link

## File Naming

- Component files: `PascalCase.tsx`
- Style files: `PascalCase.module.css`
- Hooks: `camelCase.ts` (e.g., `useToast.ts`)
- Utils: `camelCase.ts`
