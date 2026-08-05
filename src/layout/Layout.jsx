import Navbar from '../components/shared/Navbar/Navbar';
import Sidebar from '../components/shared/Sidebar/Sidebar';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <div className={styles.mainWrapper}>
        <Sidebar />
        <main className={styles.contentArea}>
          {children}
        </main>
      </div>
    </div>
  );
}