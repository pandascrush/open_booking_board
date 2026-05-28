---
name: dashboard-patterns
description: Dashboard table patterns for the Bus Ticket Booking frontend. Covers inline editing, delete confirmation dialogs, empty states, and table styling. Use when modifying the passenger dashboard or table interactions.
---

# Dashboard Patterns Skill

## Dashboard Table

Displays all CLOSED tickets in a table with columns:
Seat Number | First Name | Last Name | Email | Date of Booking | Actions

## Inline Editing

The edit flow uses state within `PassengerRow`:

1. Click "Edit" → row cells become input fields
2. Seat Number and Date remain read-only
3. "Edit" button changes to "Save" + "Cancel"
4. Validate on Save (same rules as booking form)
5. On Save → dispatch `UPDATE_PASSENGER`, show success toast
6. On Cancel → revert to display mode

```typescript
const [isEditing, setIsEditing] = useState(false);
const [editFirstName, setEditFirstName] = useState(ticket.firstName);
```

## Delete Confirmation

**Never use `window.confirm()`**. Use an inline custom confirmation:

1. Click "Delete" → replace action buttons with:
   - "Are you sure?" text
   - "Yes, delete" button (red, filled)
   - "No, keep" button (slate, filled)
2. "Yes" → dispatch `RELEASE_TICKET`, remove row
3. "No" → dismiss, restore original buttons

## Empty State

When no tickets are CLOSED:

```tsx
<div className={styles.emptyState}>
  <div className={styles.emptyIcon}>🎫</div>
  <h2>No reservations yet</h2>
  <p>Head to the Reservation page to book a seat.</p>
  <button onClick={() => navigate('/reservation')}>Go to Reservations</button>
</div>
```

## Table Styling

- Alternating row backgrounds: `#1A1A2E` / `#16213E`
- Header: `var(--color-bg-surface)`, uppercase Barlow Condensed
- Edit button: outlined accent border
- Delete button: outlined error border
- Hover on outlined buttons → fill with color
