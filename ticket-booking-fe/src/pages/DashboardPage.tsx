import { useTickets } from '../context/TicketContext';
import Dashboard from '../components/Dashboard/Dashboard';
import Toast from '../components/Toast/Toast';
import { useToast } from '../components/Toast/useToast';

export default function DashboardPage() {
  const { tickets, updatePassenger, releaseSeat } = useTickets();
  const { toasts, showToast, removeToast } = useToast();

  const totalSeats  = tickets.length;
  const openSeats   = tickets.filter((t) => t.status === 'OPEN').length;
  const closedSeats = tickets.filter((t) => t.status === 'CLOSED').length;

  const handleUpdate = async (
    seatNumber: number,
    data: { firstName: string; lastName: string; email: string }
  ) => {
    const res = await updatePassenger(seatNumber, data.firstName, data.lastName, data.email);
    if (res.success) {
      showToast(`Seat #${seatNumber} passenger details updated!`, 'success');
    } else {
      showToast(res.message || 'Failed to update passenger details', 'error');
    }
  };

  const handleDelete = async (seatNumber: number) => {
    const res = await releaseSeat(seatNumber);
    if (res.success) {
      showToast(`Seat #${seatNumber} reservation cancelled.`, 'success');
    } else {
      showToast(res.message || 'Failed to cancel reservation', 'error');
    }
  };

  return (
    <div className="page-content">
      {/* Page heading */}
      <div className="page-heading">
        <h1>Passenger Dashboard</h1>
        <p>Manage and edit all passenger reservations</p>
      </div>

      {/* Stats strip */}
      <div className="stats-strip">
        <div className="stat-card total">
          <div className="stat-value">{totalSeats}</div>
          <div className="stat-label">Total Seats</div>
        </div>
        <div className="stat-card open">
          <div className="stat-value">{openSeats}</div>
          <div className="stat-label">Available</div>
        </div>
        <div className="stat-card booked">
          <div className="stat-value">{closedSeats}</div>
          <div className="stat-label">Booked</div>
        </div>
      </div>

      <Dashboard
        tickets={tickets}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
