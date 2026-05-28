---
name: auth-and-roles
description: Admin authentication middleware for the Bus Ticket Booking backend. Covers header-based secret validation and route guarding. Use when adding protected routes or modifying the auth flow.
---

# Auth & Roles Skill

## Admin Auth Middleware (`src/middlewares/adminAuth.ts`)

The backend uses a simple header-based secret for admin endpoints.

### How It Works
1. Client sends `x-admin-secret` header with the request
2. Middleware compares header value to `ADMIN_SECRET` from `.env`
3. If match → `next()` (request continues)
4. If no match or missing → `401 Unauthorized`

```typescript
export function adminAuth(req, res, next) {
  const adminSecret = req.headers['x-admin-secret'];
  if (!adminSecret || adminSecret !== config.adminSecret) {
    sendError(res, 'Unauthorized: Invalid or missing admin secret', 401);
    return;
  }
  next();
}
```

## Applying to Routes

Guard entire routers by applying middleware before route handlers:

```typescript
// In admin.routes.ts
router.use(adminAuth); // All routes below are protected
router.post('/reset', adminController.resetAllTickets);
```

## Environment Configuration

```env
ADMIN_SECRET=super-secret-admin-key-2024
```

## Testing Admin Routes

```bash
curl -X POST http://localhost:3000/api/v1/admin/reset \
  -H "x-admin-secret: super-secret-admin-key-2024"
```
