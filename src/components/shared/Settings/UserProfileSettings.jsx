import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, GraduationCap, Briefcase, Save, Check, Settings, LogOut } from 'lucide-react';
import { useUser } from '../../../context/UserContext';
import styles from './UserProfileSettings.module.css';

export default function UserProfileSettings() {
  const { user, updateUser, clearUser } = useUser();
  const navigate = useNavigate();

  const initialName = user?.fullName || user?.name || '';

  const [formData, setFormData] = useState({
    fullName: initialName,
    email: user?.email || '',
    role: user?.role || 'student',
    level: user?.level || 'principiante'
  });

  const [prevUser, setPrevUser] = useState(user);

  if (user !== prevUser) {
    setPrevUser(user);
    const updatedName = user?.fullName || user?.name || '';
    setFormData({
      fullName: updatedName,
      email: user?.email || '',
      role: user?.role || 'student',
      level: user?.level || 'principiante'
    });
  }

  const [isSaved, setIsSaved] = useState(false);

  const hasUserData = Boolean(user?.fullName?.trim() || user?.email?.trim() || user?.name?.trim());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'fullName' ? { name: value } : {}),
      ...(name === 'name' ? { fullName: value } : {})
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dataToSave = {
      ...formData,
      name: formData.fullName,
      fullName: formData.fullName
    };

    updateUser(dataToSave);
    
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const handleLogout = (e) => {
    if (e) e.preventDefault();

    if (window.confirm('¿Estás seguro de que deseas limpiar los datos del perfil y cerrar sesión?')) {
      clearUser();
      navigate('/', { replace: true });
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <Settings className={styles.headerIcon} size={24} />
          <div>
            <h2>Configuración de Perfil</h2>
            <p>Gestiona tu información personal y rol en Muyu Education</p>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Perfil de Usuario</h3>

          <div className={styles.fieldGroup}>
            <label htmlFor="fullName">Nombre Completo</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={18} />
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Ingresa tu nombre completo"
                required
              />
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="email">Correo Electrónico</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@muyu.edu"
                required
              />
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Rol en la Plataforma</h3>

          <div className={styles.roleGrid}>
            <div
              className={`${styles.roleCard} ${formData.role === 'student' ? styles.roleActive : ''}`}
              onClick={() => handleRoleSelect('student')}
            >
              <GraduationCap size={22} />
              <div>
                <strong>Estudiante</strong>
                <span>Accede a tutorías y realiza quizes para aprender</span>
              </div>
            </div>

            <div
              className={`${styles.roleCard} ${formData.role === 'teacher' ? styles.roleActive : ''}`}
              onClick={() => handleRoleSelect('teacher')}
            >
              <Briefcase size={22} />
              <div>
                <strong>Docente</strong>
                <span>Genera contenido educativo y evalúa estudiantes</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Preferencias Académicas</h3>

          <div className={styles.fieldGroup}>
            <label htmlFor="level">Nivel Predeterminado</label>
            <select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              className={styles.selectInput}
            >
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
            </select>
          </div>
        </div>

        <footer className={styles.footer}>
          {hasUserData ? (
            <button 
              type="button" 
              onClick={handleLogout} 
              className={styles.logoutBtn}
            >
              <LogOut size={18} />
              <span>Cerrar Sesión</span>
            </button>
          ) : (
            <div />
          )}

          <div className={styles.actionGroup}>
            {isSaved && (
              <div className={styles.successBadge}>
                <Check size={18} />
                <span>Cambios guardados con éxito</span>
              </div>
            )}

            <button type="submit" className={styles.saveBtn}>
              <Save size={18} />
              <span>Guardar Cambios</span>
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}