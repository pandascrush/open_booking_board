import type { ToastMessage } from './useToast';
import styles from './Toast.module.css';

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: number) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  if (toasts.length === 0) return null;

  return (
    <div className={styles.container} role="region" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${toast.type === 'success' ? styles.success : styles.error}`}
          onClick={() => onRemove(toast.id)}
          role="alert"
          aria-live="polite"
        >
          <span className={styles.iconWrap}>
            {toast.type === 'success' ? '✓' : '✕'}
          </span>
          <span className={styles.message}>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
