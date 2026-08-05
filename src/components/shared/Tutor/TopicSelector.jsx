import { BookOpen, BarChart2 } from 'lucide-react';
import styles from './TopicSelector.module.css';

const SUBJECTS = [
  'Programación y Desarrollo',
  'Matemáticas y Álgebra',
  'Ciencia y Física',
  'Historia Universal',
  'Idiomas y Gramática'
];

const LEVELS = ['Principiante', 'Intermedio', 'Avanzado'];

export default function TopicSelector({ subject, setSubject, level, setLevel, disabled }) {
  return (
    <div className={styles.selectorContainer}>
      <div className={styles.fieldGroup}>
        <BookOpen size={16} className={styles.icon} />
        <select 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)}
          disabled={disabled}
          className={styles.select}
        >
          {SUBJECTS.map((sub) => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
      </div>

      <div className={styles.fieldGroup}>
        <BarChart2 size={16} className={styles.icon} />
        <select 
          value={level} 
          onChange={(e) => setLevel(e.target.value)}
          disabled={disabled}
          className={styles.select}
        >
          {LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>
    </div>
  );
}