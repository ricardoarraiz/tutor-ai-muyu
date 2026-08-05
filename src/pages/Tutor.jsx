import ChatInterface from '../components/shared/tutor/ChatInterface';
import styles from './Tutor.module.css';

export default function Tutor() {
  return (
    <div className={styles.pageContainer}>
      <ChatInterface />
    </div>
  );
}