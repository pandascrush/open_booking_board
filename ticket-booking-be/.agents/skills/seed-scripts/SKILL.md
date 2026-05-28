---
name: seed-scripts
description: Database seeding patterns using Prisma upsert for the Bus Ticket Booking backend. Covers idempotent seed scripts and npm script setup. Use when modifying seed data or adding new seed scripts.
---

# Seed Scripts Skill

## Location

Seed scripts live in `src/scripts/`. The main seed is `seed.ts`.

## Idempotent Seeding

Use Prisma's `upsert` to make seeds safe to run multiple times:

```typescript
for (let seatNumber = 1; seatNumber <= TOTAL_SEATS; seatNumber++) {
  await prisma.ticket.upsert({
    where: { seatNumber },
    update: {},        // No-op if the record already exists
    create: {
      seatNumber,
      status: TicketStatus.OPEN,
    },
  });
}
```

## NPM Script

```json
"seed": "ts-node src/scripts/seed.ts"
```

Run with: `npm run seed`

## Seed Script Structure

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed(): Promise<void> {
  console.log('🌱 Seeding database...');
  // ... seeding logic ...
  console.log('✅ Seeded successfully.');
  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  prisma.$disconnect();
  process.exit(1);
});
```

## Best Practices

- Always use `upsert` for idempotency
- Disconnect Prisma client when done
- Handle errors with proper exit codes
- Log progress clearly
