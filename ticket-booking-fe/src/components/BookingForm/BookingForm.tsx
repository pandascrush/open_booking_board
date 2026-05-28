import { useState } from 'react';
import styles from './BookingForm.module.css';

interface BookingFormProps {
  seatNumber: number;
  onSubmit: (data: { firstName: string; lastName: string; email: string }) => void;
  onCancel: () => void;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function BookingForm({ seatNumber, onSubmit, onCancel }: BookingFormProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.title}>
          Reserve Seat <span className={styles.seatBadge}>#{seatNumber}</span>
        </h3>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* First Name + Last Name side by side on wider screens */}
          <div className={styles.nameRow}>
            <div className={styles.field}>
              <label htmlFor="booking-firstName" className={styles.label}>First Name</label>
              <input
                id="booking-firstName"
                type="text"
                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name"
                autoComplete="given-name"
              />
              {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
            </div>

            <div className={styles.field}>
              <label htmlFor="booking-lastName" className={styles.label}>Last Name</label>
              <input
                id="booking-lastName"
                type="text"
                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                autoComplete="family-name"
              />
              {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="booking-email" className={styles.label}>Email Address</label>
            <input
              id="booking-email"
              type="email"
              className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              autoComplete="email"
            />
            {errors.email && <span className={styles.error}>{errors.email}</span>}
          </div>

          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn} id="btn-confirm-reservation">
              Confirm Reservation
            </button>
            <button type="button" className={styles.cancelBtn} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
