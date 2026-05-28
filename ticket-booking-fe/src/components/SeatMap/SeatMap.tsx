import type { Ticket } from '../../types';
import Seat from './Seat';
import styles from './SeatMap.module.css';

interface SeatMapProps {
  tickets: Ticket[];
  selectedSeat: number | null;
  onSelectSeat: (seatNumber: number) => void;
}

export default function SeatMap({ tickets, selectedSeat, onSelectSeat }: SeatMapProps) {
  const lowerDeck = tickets.filter((t) => t.seatNumber >= 1 && t.seatNumber <= 20);
  const upperDeck = tickets.filter((t) => t.seatNumber >= 21 && t.seatNumber <= 40);

  const renderDeckLayout = (deckTickets: Ticket[], isLower: boolean) => {
    // 20 seats per deck: Row 1 (7 seats), Row 2 (7 seats), Row 3 (6 seats)
    const row1 = deckTickets.slice(0, 7);
    const row2 = deckTickets.slice(7, 14);
    const row3 = deckTickets.slice(14, 20);

    return (
      <div className={styles.deck}>
        <div className={styles.leftBar} />
        
        <div className={styles.deckContent}>
          {/* Left section: Steering Wheel or blank spacer */}
          <div className={styles.leftSection}>
            {isLower ? (
              <div className={styles.steeringWheel} title="Driver Seat">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-closed)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="2" />
                  <line x1="12" y1="2" x2="12" y2="10" />
                  <line x1="12" y1="14" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="10" y2="12" />
                  <line x1="14" y1="12" x2="22" y2="12" />
                </svg>
              </div>
            ) : (
              <div className={styles.leftSpacer} />
            )}
          </div>

          {/* Seat layout section */}
          <div className={styles.gridSection}>
            <div className={styles.seatRow}>
              {row1.map((ticket) => (
                <Seat
                  key={ticket.seatNumber}
                  seatNumber={ticket.seatNumber}
                  status={ticket.status}
                  isSelected={selectedSeat === ticket.seatNumber}
                  onSelect={onSelectSeat}
                />
              ))}
            </div>
            <div className={styles.seatRow}>
              {row2.map((ticket) => (
                <Seat
                  key={ticket.seatNumber}
                  seatNumber={ticket.seatNumber}
                  status={ticket.status}
                  isSelected={selectedSeat === ticket.seatNumber}
                  onSelect={onSelectSeat}
                />
              ))}
            </div>
            
            {/* Aisle Spacer */}
            <div className={styles.aisle} />
            
            <div className={styles.seatRow}>
              {row3.map((ticket) => (
                <Seat
                  key={ticket.seatNumber}
                  seatNumber={ticket.seatNumber}
                  status={ticket.status}
                  isSelected={selectedSeat === ticket.seatNumber}
                  onSelect={onSelectSeat}
                />
              ))}
              {/* Spacer for the door on row 3 */}
              <div className={styles.doorGapSeat} />
            </div>
          </div>

          {/* Right section: Exit Door */}
          <div className={styles.rightSection}>
            <div className={styles.door} title="Exit Door">
              <div className={styles.doorHandle} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotOpen}`} />
          Available
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotBooked}`} />
          Booked
        </div>
        <div className={styles.legendItem}>
          <span className={`${styles.legendDot} ${styles.legendDotSelected}`} />
          Selected
        </div>
      </div>

      <div className={styles.decksWrapper}>
        <div className={styles.deckContainer}>
          <span className={styles.deckTitle}>Lower Deck</span>
          {renderDeckLayout(lowerDeck, true)}
        </div>
        <div className={styles.deckContainer}>
          <span className={styles.deckTitle}>Upper Deck</span>
          {renderDeckLayout(upperDeck, false)}
        </div>
      </div>
    </div>
  );
}
