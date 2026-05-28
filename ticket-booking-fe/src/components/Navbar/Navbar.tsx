import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { path: '/reservation', label: 'Seat Reservation' },
  { path: '/dashboard',   label: 'Passenger Dashboard' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.inner}>
          {/* Brand */}
          <button className={styles.brand} onClick={() => handleNav('/reservation')} aria-label="Go home">
            <span className={styles.brandIconWrap}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13" rx="2"/>
                <path d="M16 8h4l3 5v3h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </span>
            <span className={styles.brandText}>BusBook</span>
          </button>

          {/* Desktop nav links */}
          <div className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <button
                key={link.path}
                className={`${styles.navLink} ${location.pathname === link.path ? styles.navLinkActive : ''}`}
                onClick={() => handleNav(link.path)}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ''}`} aria-hidden={!menuOpen}>
        <div className={styles.drawerInner}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              className={`${styles.drawerLink} ${location.pathname === link.path ? styles.drawerLinkActive : ''}`}
              onClick={() => handleNav(link.path)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div className={styles.backdrop} onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}
    </>
  );
}
