import { PrismaClient } from '@prisma/client';
import { TOTAL_SEATS } from '../constants';

const prisma = new PrismaClient();

async function seed(): Promise<void> {
  console.log('🌱 Seeding database...');

  for (let seatNumber = 1; seatNumber <= TOTAL_SEATS; seatNumber++) {
    await prisma.ticket.upsert({
      where: { seatNumber },
      update: {},
      create: {
        seatNumber,
        status: 'OPEN',
      },
    });
  }

  console.log(`✅ Seeded ${TOTAL_SEATS} tickets as OPEN.`);
  await prisma.$disconnect();
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error);
  prisma.$disconnect();
  process.exit(1);
});
