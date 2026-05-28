import { useState } from 'react';
import type { Ticket } from '../../types';
import { formatDate } from '../../utils/formatDate';
import styles from './Dashboard.module.css';

interface PassengerRowProps {
  ticket: Ticket;
  onUpdate: (seatNumber: number, data: { firstName: string; lastName: string; email: string }) => void;
  onDelete: (seatNumber: number) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export default function PassengerRow({ ticket, onUpdate, onDelete }: PassengerRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editFirstName, setEditFirstName] = useState(ticket.firstName || '');
  const [editLastName, setEditLastName] = useState(ticket.lastName || '');
  const [editEmail, setEditEmail] = useState(ticket.email || '');
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleEdit = () => {
    setIsEditing(true);
    setEditFirstName(ticket.firstName || '');
    setEditLastName(ticket.lastName || '');
    setEditEmail(ticket.email || '');
    setErrors({});
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  const validate = (): boolean => {
    const newErrors: FieldErrors = {};
    if (!editFirstName.trim()) newErrors.firstName = 'Required';
    if (!editLastName.trim()) newErrors.lastName = 'Required';
    if (!editEmail.trim()) {
      newErrors.email = 'Required';
    } else if (!EMAIL_REGEX.test(editEmail)) {
      newErrors.email = 'Invalid email';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onUpdate(ticket.seatNumber, {
        firstName: editFirstName.trim(),
        lastName: editLastName.trim(),
        email: editEmail.trim(),
      });
      setIsEditing(false);
    }
  };

  return (
    <tr className={styles.row}>
      <td className={styles.cell}>{ticket.seatNumber}</td>
      <td className={styles.cell}>
        {isEditing ? (
          <div className={styles.editField}>
            <input
              className={`${styles.editInput} ${errors.firstName ? styles.editInputError : ''}`}
              value={editFirstName}
              onChange={(e) => setEditFirstName(e.target.value)}
            />
            {errors.firstName && <span className={styles.editError}>{errors.firstName}</span>}
          </div>
        ) : (
          ticket.firstName
        )}
      </td>
      <td className={styles.cell}>
        {isEditing ? (
          <div className={styles.editField}>
            <input
              className={`${styles.editInput} ${errors.lastName ? styles.editInputError : ''}`}
              value={editLastName}
              onChange={(e) => setEditLastName(e.target.value)}
            />
            {errors.lastName && <span className={styles.editError}>{errors.lastName}</span>}
          </div>
        ) : (
          ticket.lastName
        )}
      </td>
      <td className={styles.cell}>
        {isEditing ? (
          <div className={styles.editField}>
            <input
              className={`${styles.editInput} ${errors.email ? styles.editInputError : ''}`}
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
            />
            {errors.email && <span className={styles.editError}>{errors.email}</span>}
          </div>
        ) : (
          ticket.email
        )}
      </td>
      <td className={styles.cell}>
        {ticket.bookedAt ? formatDate(ticket.bookedAt) : '—'}
      </td>
      <td className={styles.cell}>
        {showDeleteConfirm ? (
          <div className={styles.confirmBlock}>
            <span className={styles.confirmText}>Are you sure?</span>
            <button
              className={styles.confirmYes}
              onClick={() => {
                onDelete(ticket.seatNumber);
                setShowDeleteConfirm(false);
              }}
            >
              Yes, delete
            </button>
            <button
              className={styles.confirmNo}
              onClick={() => setShowDeleteConfirm(false)}
            >
              No, keep
            </button>
          </div>
        ) : isEditing ? (
          <div className={styles.actionGroup}>
            <button className={styles.saveBtn} onClick={handleSave}>Save</button>
            <button className={styles.cancelEditBtn} onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <div className={styles.actionGroup}>
            <button className={styles.editBtn} onClick={handleEdit}>Edit</button>
            <button className={styles.deleteBtn} onClick={() => setShowDeleteConfirm(true)}>Delete</button>
          </div>
        )}
      </td>
    </tr>
  );
}
