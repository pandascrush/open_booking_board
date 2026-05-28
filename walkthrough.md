# Bus Ticket Booking System — Walkthrough

## Summary

Built a complete Bus Ticket Booking System with two self-contained projects and 20 agent skill files:

| Component | Path | Files | Status |
|-----------|------|-------|--------|
| Backend | `ticket-booking-be/` | 24 files | ✅ Verified & Persistent |
| Frontend | `ticket-booking-fe/` | 27 files | ✅ Integrated with DB Backend |
| BE Agent Skills | `ticket-booking-be/.agents/skills/` | 10 folders | ✅ Created |
| FE Agent Skills | `ticket-booking-fe/.agents/skills/` | 10 folders | ✅ Created |

---

## Backend — REST API

### Tech Stack
- **Runtime**: Node.js + TypeScript (strict)
- **Framework**: Express 4
- **ORM**: Prisma with SQLite (portable to PostgreSQL)
- **Validation**: Zod
- **Events**: Node.js EventEmitter (singleton)
- **Cron**: node-cron (daily report at midnight)

### API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/v1/tickets` | All 40 tickets |
| `GET` | `/api/v1/tickets/open` | OPEN tickets |
| `GET` | `/api/v1/tickets/closed` | CLOSED tickets |
| `GET` | `/api/v1/tickets/:seatNumber` | Single ticket |
| `POST` | `/api/v1/tickets/:seatNumber/book` | Book a seat |
| `PUT` | `/api/v1/tickets/:seatNumber` | Update seat passenger details (Admin) |
| `DELETE` | `/api/v1/tickets/:seatNumber/release` | Release a seat |
| `POST` | `/api/v1/admin/reset` | Reset all tickets (admin only) |

### Architecture
```
Controllers (thin) → Services (business logic + events) → Prisma (DB)
                     ↓
              EventEmitter → Logger → logs/
```

### Key Files
- [main.ts](file:///d:/Ticket%20Booking%20System/ticket-booking-be/src/main.ts) — Express bootstrap
- [ticket.service.ts](file:///d:/Ticket%20Booking%20System/ticket-booking-be/src/services/ticket.service.ts) — All business logic + persistence layer
- [ticket.controller.ts](file:///d:/Ticket%20Booking%20System/ticket-booking-be/src/controllers/ticket.controller.ts) — HTTP handlers
- [schema.prisma](file:///d:/Ticket%20Booking%20System/ticket-booking-be/prisma/schema.prisma) — Ticket model
- [eventEmitter.ts](file:///d:/Ticket%20Booking%20System/ticket-booking-be/src/utils/eventEmitter.ts) — Domain events
- [errorHandler.ts](file:///d:/Ticket%20Booking%20System/ticket-booking-be/src/middlewares/errorHandler.ts) — Error mapping

---

## Frontend — React SPA (Connected to DB)

### Tech Stack
- React 18 + TypeScript (strict)
- React Router v6
- Vite
- CSS Modules (no external CSS frameworks)

### Design System — "Birthright Israel Palette"
- Deep navy blue backgrounds with bright blue accents
- Roboto (headings + body)
- Glassmorphic seat grid cards
- Smooth micro-animations (slide-down, fade-in, scale hover)

### Routes
| Path | Page | Description |
|------|------|-------------|
| `/` | Redirect → `/reservation` | |
| `/reservation` | ReservationPage | Seat map (fetched from DB) + booking form |
| `/dashboard` | DashboardPage | Passenger table (persisted to DB) + inline edit/release + admin reset |

### Key Features
- **Real DB Persistence**: Frontend connects directly to the Node/Express backend. All actions (booking, canceling, editing passenger details, resetting) write directly to the SQLite database via REST API.
- **Seat Map**: 40 seats in Lower/Upper deck grid styled precisely to the wireframe layout.
- **3 Seat States**: OPEN (white/grey outline) / CLOSED (slate) / SELECTED (coral/red) with individual seat headrest details.
- **Admin Reset Button**: A red header button on the dashboard allowing full resets of all bookings using the backend Admin API.

### Key Files
- [App.tsx](file:///d:/Ticket%20Booking%20System/ticket-booking-fe/src/App.tsx) — Router + TicketProvider
- [TicketContext.tsx](file:///d:/Ticket%20Booking%20System/ticket-booking-fe/src/context/TicketContext.tsx) — State synchronizer calling the backend APIs
- [SeatMap.tsx](file:///d:/Ticket%20Booking%20System/ticket-booking-fe/src/components/SeatMap/SeatMap.tsx) — Deck grid layout
- [BookingForm.tsx](file:///d:/Ticket%20Booking%20System/ticket-booking-fe/src/components/BookingForm/BookingForm.tsx) — Reservation form
- [Dashboard.tsx](file:///d:/Ticket%20Booking%20System/ticket-booking-fe/src/components/Dashboard/Dashboard.tsx) — Passenger table
- [index.css](file:///d:/Ticket%20Booking%20System/ticket-booking-fe/src/index.css) — Design system tokens

---

## Startup Instructions

### Backend
```bash
cd ticket-booking-be
npm install
npx prisma migrate dev --name init
npm run seed
npm run dev
# → http://localhost:3000
```

### Frontend
```bash
cd ticket-booking-fe
npm install
npm run dev
# → http://localhost:5173
```
