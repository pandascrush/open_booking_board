import { useNavigate } from 'react-router-dom';
import type { Ticket } from '../../types';
import PassengerRow from './PassengerRow';
import styles from './Dashboard.module.css';

interface DashboardProps {
  tickets: Ticket[];
  onUpdate: (seatNumber: number, data: { firstName: string; lastName: string; email: string }) => void;
  onDelete: (seatNumber: number) => void;
}

export default function Dashboard({ tickets, onUpdate, onDelete }: DashboardProps) {
  const navigate = useNavigate();
  const closedTickets = tickets.filter((t) => t.status === 'CLOSED');

  if (closedTickets.length === 0) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>🎫</div>
        <h2 className={styles.emptyTitle}>No reservations yet</h2>
        <p className={styles.emptyText}>
          Head to the Reservation page to book a seat.
        </p>
        <button
          className={styles.emptyBtn}
          onClick={() => navigate('/reservation')}
        >
          Go to Reservations
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Seat</th>
              <th className={styles.th}>First Name</th>
              <th className={styles.th}>Last Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>Date of Booking</th>
              <th className={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {closedTickets.map((ticket) => (
              <PassengerRow
                key={ticket.seatNumber}
                ticket={ticket}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
