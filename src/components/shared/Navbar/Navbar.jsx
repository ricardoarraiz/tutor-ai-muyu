import { GraduationCap, Sparkles } from 'lucide-react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { useUser } from '../../../context/UserContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user } = useUser();

  const rawName = user?.fullName || user?.name || '';
  const currentName = rawName.trim() !== '' ? rawName : 'Sin Nombre';

  const getInitial = (name) => {
    if (!name || name === 'Sin Nombre') return '?';
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.logoIcon}>
          <GraduationCap size={24} color="#ffffff" />
        </div>
        <h1 className={styles.logoText}>
          Muyu <span className={styles.highlight}>EdTech</span>
        </h1>
      </div>

      <div className={styles.actions}>
        <span className={styles.badge}>
          <Sparkles size={14} className={styles.badgeIcon} />
          Tutor IA Activo
        </span>

        <ThemeToggle />

        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {currentName}
            </span>
            <span className={styles.userRole}>
              {user?.role === 'teacher' ? 'Docente' : 'Estudiante'}
            </span>
          </div>

          <div className={styles.avatar} title={currentName}>
            {getInitial(currentName)}
          </div>
        </div>
      </div>
    </header>
  );
}