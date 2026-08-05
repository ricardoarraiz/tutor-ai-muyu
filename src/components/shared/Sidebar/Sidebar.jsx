import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, Bot } from 'lucide-react';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.navMenu}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink 
          to="/tutor" 
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <Bot size={18} />
          <span>Tutor IA</span>
        </NavLink>

        <NavLink 
          to="/perfil" 
          className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
        >
          <User size={18} />
          <span>Perfil</span>
        </NavLink>
      </nav>
    </aside>
  );
}