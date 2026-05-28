---
name: toast-notifications
description: Toast notification system for the Bus Ticket Booking frontend. Covers the useToast hook, Toast component, auto-dismiss behavior, and animation patterns. Use when adding or modifying toast notifications.
---

# Toast Notifications Skill

## Architecture

The toast system has two parts:
1. **`useToast` hook** (`src/components/Toast/useToast.ts`) — manages toast state
2. **`Toast` component** (`src/components/Toast/Toast.tsx`) — renders notifications

## Usage

```tsx
import Toast from '../components/Toast/Toast';
import { useToast } from '../components/Toast/useToast';

function MyPage() {
  const { toasts, showToast, removeToast } = useToast();

  const handleAction = () => {
    showToast('Operation successful!', 'success');
    // or
    showToast('Something went wrong', 'error');
  };

  return (
    <>
      {/* Page content */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </>
  );
}
```

## Behavior

- Auto-dismiss after **3 seconds**
- Click to dismiss manually
- Multiple toasts stack vertically
- Fixed position: **bottom-right**

## Visual Design

- **Success**: Left border `4px solid var(--color-success)`, ✓ icon
- **Error**: Left border `4px solid var(--color-error)`, ✕ icon
- Background: `var(--color-bg-surface)`
- Font: IBM Plex Mono 13px
- Animation: Slide up + fade in (0.3s)
