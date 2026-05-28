import styles from './SeatMap.module.css';

interface SeatProps {
  seatNumber: number;
  status: 'OPEN' | 'CLOSED';
  isSelected: boolean;
  onSelect: (seatNumber: number) => void;
}

export default function Seat({ seatNumber, status, isSelected, onSelect }: SeatProps) {
  const handleClick = () => {
    if (status === 'CLOSED') return;
    onSelect(seatNumber);
  };

  const stateClass = isSelected ? styles.selected : status === 'CLOSED' ? styles.closed : styles.open;

  return (
    <button
      id={`seat-${seatNumber}`}
      className={`${styles.seat} ${stateClass}`}
      onClick={handleClick}
      disabled={status === 'CLOSED' && !isSelected}
      aria-label={
        isSelected
          ? `Seat ${seatNumber} — Selected`
          : status === 'CLOSED'
          ? `Seat ${seatNumber} — Booked`
          : `Seat ${seatNumber} — Available, click to select`
      }
      title={
        isSelected
          ? `Seat #${seatNumber} — Selected`
          : status === 'CLOSED'
          ? `Seat #${seatNumber} — Booked`
          : `Seat #${seatNumber} — Available`
      }
    >
      <span className={styles.seatNumber}>{seatNumber}</span>
      <span className={styles.headrest} />
    </button>
  );
}
