---
name: prisma-patterns
description: Prisma ORM patterns for the Bus Ticket Booking backend. Covers schema design, migrations, upsert patterns, and SQLite-to-PostgreSQL portability. Use when modifying the database schema or writing Prisma queries.
---

# Prisma Patterns Skill

## Schema Design

The schema uses SQLite for local dev but is portable to PostgreSQL:

```prisma
datasource db {
  provider = "sqlite"    // Change to "postgresql" for production
  url      = env("DATABASE_URL")
}
```

### Key Model: Ticket
```prisma
model Ticket {
  id         Int          @id @default(autoincrement())
  seatNumber Int          @unique
  status     TicketStatus @default(OPEN)
  firstName  String?
  lastName   String?
  email      String?
  bookedAt   DateTime?
  createdAt  DateTime     @default(now())
  updatedAt  DateTime     @updatedAt
}
```

## Query Patterns

### Find operations
```typescript
// Single ticket by unique field
prisma.ticket.findUnique({ where: { seatNumber } })

// Multiple tickets with filter
prisma.ticket.findMany({ where: { status: 'OPEN' }, orderBy: { seatNumber: 'asc' } })
```

### Update operations
```typescript
// Update single ticket
prisma.ticket.update({ where: { seatNumber }, data: { status: 'CLOSED', ... } })

// Bulk update
prisma.ticket.updateMany({ data: { status: 'OPEN', firstName: null, ... } })
```

### Upsert (for seeding)
```typescript
prisma.ticket.upsert({
  where: { seatNumber },
  update: {},           // No-op if exists
  create: { seatNumber, status: 'OPEN' },
})
```

## Migration Workflow

```bash
npx prisma migrate dev --name <migration-name>  # Create + apply migration
npx prisma generate                              # Regenerate client
npx prisma migrate reset                         # Reset DB (destructive)
```

## SQLite → PostgreSQL Migration

1. Change `provider` in `schema.prisma` to `"postgresql"`
2. Update `DATABASE_URL` in `.env` to PostgreSQL connection string
3. Run `npx prisma migrate dev` to recreate migrations
4. Note: SQLite doesn't support some Postgres-specific features (enums work in both)
