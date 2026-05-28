import { useState } from 'react';
import { useTickets } from '../context/TicketContext';
import SeatMap from '../components/SeatMap/SeatMap';
import BookingForm from '../components/BookingForm/BookingForm';
import Toast from '../components/Toast/Toast';
import { useToast } from '../components/Toast/useToast';

export default function ReservationPage() {
  const { tickets, bookSeat } = useTickets();
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const { toasts, showToast, removeToast } = useToast();

  const totalSeats  = tickets.length;
  const openSeats   = tickets.filter((t) => t.status === 'OPEN').length;
  const closedSeats = tickets.filter((t) => t.status === 'CLOSED').length;

  const handleSelectSeat = (seatNumber: number) => {
    setSelectedSeat((prev) => (prev === seatNumber ? null : seatNumber));
  };

  const handleBooking = async (data: { firstName: string; lastName: string; email: string }) => {
    if (selectedSeat === null) return;
    const res = await bookSeat(selectedSeat, data.firstName, data.lastName, data.email);
    if (res.success) {
      showToast(`Seat #${selectedSeat} successfully reserved! 🎉`, 'success');
      setSelectedSeat(null);
    } else {
      showToast(res.message || `Failed to reserve seat #${selectedSeat}`, 'error');
    }
  };

  return (
    <div className="page-content">
      {/* Page heading */}
      <div className="page-heading">
        <h1>Seat Reservation</h1>
        <p>Select an available seat below to begin your booking</p>
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

      {/* Info banner */}
      <div className="info-banner">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Click on a green (Available) seat to proceed with your reservation.
      </div>

      {/* Seat map */}
      <SeatMap
        tickets={tickets}
        selectedSeat={selectedSeat}
        onSelectSeat={handleSelectSeat}
      />

      {/* Booking form — slides in when seat selected */}
      {selectedSeat !== null && (
        <BookingForm
          seatNumber={selectedSeat}
          onSubmit={handleBooking}
          onCancel={() => setSelectedSeat(null)}
        />
      )}

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
