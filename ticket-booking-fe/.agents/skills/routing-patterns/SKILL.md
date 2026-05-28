---
name: routing-patterns
description: React Router v6 patterns for the Bus Ticket Booking frontend. Covers route setup, navigation dropdown, redirects, and route-aware components. Use when adding new routes or modifying navigation.
---

# Routing Patterns Skill

## Router Setup (`src/App.tsx`)

```tsx
<BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Navigate to="/reservation" replace />} />
    <Route path="/reservation" element={<ReservationPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
  </Routes>
</BrowserRouter>
```

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Redirect | → `/reservation` |
| `/reservation` | `ReservationPage` | Seat map + booking form |
| `/dashboard` | `DashboardPage` | Passenger table |

## Navigation

Navigation is handled via a dropdown `<select>` in the Navbar:

```tsx
const navigate = useNavigate();
const location = useLocation();

<select value={location.pathname} onChange={(e) => navigate(e.target.value)}>
  <option value="/reservation">Seat Reservation</option>
  <option value="/dashboard">Passenger Dashboard</option>
</select>
```

The active route is automatically reflected in the dropdown's selected value.

## Programmatic Navigation

```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
navigate('/reservation');  // Navigate to reservation page
```

## Adding New Routes

1. Create page component in `src/pages/`
2. Add `<Route>` in `App.tsx`
3. Add `<option>` in `Navbar.tsx` dropdown
