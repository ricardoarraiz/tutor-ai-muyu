import { GraduationCap, Sparkles } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.logoIcon}>
          <GraduationCap size={24} color="#ffffff" />
        </div>
        <h1 className={styles.logoText}>Muyu <span className={styles.highlight}>EdTech</span></h1>
      </div>
      <div className={styles.actions} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <span className={styles.badge}>
          <Sparkles size={14} className={styles.badgeIcon} />
          Tutor IA Activo
        </span>
        <ThemeToggle />
      </div>
    </header>
  );
}