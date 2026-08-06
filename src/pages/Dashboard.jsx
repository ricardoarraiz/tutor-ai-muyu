import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, MessageSquare, Lightbulb, ArrowRight, Check } from 'lucide-react';
import styles from './Dashboard.module.css';

const PROMPT_BANK = [
  {
    category: 'Explicación Fácil',
    prompt: 'Explícame el concepto de [Tema] como si fuera un principiante de 10 años, usando una analogía del mundo real.',
  },
  {
    category: 'Depuración de Código',
    prompt: 'Tengo este error en mi código: [Error]. Explícame la causa raíz y dame una pista para solucionarlo sin darme la respuesta directa.',
  },
  {
    category: 'Autoevaluación',
    prompt: 'Genera un quiz de 3 preguntas de opción múltiple sobre [Materia/Tema] para poner a prueba lo que he aprendido hoy.',
  },
  {
    category: 'Ejemplos Prácticos',
    prompt: 'Dame 3 casos de uso reales donde se aplique [Tecnología/Concepto] en la industria actual.',
  },
  {
    category: 'Resumen y Síntesis',
    prompt: 'Resume los puntos clave de [Tema/Texto] en 5 viñetas claras y concisas.',
  },
  {
    category: 'Paso a Paso',
    prompt: 'Guíame paso a paso para estructurar un proyecto de [Tecnología], indicando las mejores prácticas desde cero.',
  },
  {
    category: 'Comparación',
    prompt: '¿Cuáles son las diferencias principales entre [Opción A] y [Opción B]? Crea una tabla comparativa con pros y contras.',
  },
  {
    category: 'Método Socrático',
    prompt: 'Quiero aprender sobre [Tema]. En lugar de darme la lección completa, hazme preguntas guía para que yo vaya descubriendo la respuesta.',
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [copiedIndex, setCopiedIndex] = useState(null);

  const [userName] = useState(() => {
    try {
      const rawData = localStorage.getItem('muyu_user') || localStorage.getItem('muyu_user_profile');
      if (!rawData) return 'Estudiante';
      const parsed = JSON.parse(rawData);
      const fullName = parsed.name || parsed.fullName;
      return fullName ? fullName.split(' ')[0] : 'Estudiante';
    } catch {
      return 'Estudiante';
    }
  });

  const getRandomSuggestions = () => {
    const shuffled = [...PROMPT_BANK].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const [suggestions, setSuggestions] = useState(() => getRandomSuggestions());

  const handleRefreshSuggestions = () => {
    setSuggestions(getRandomSuggestions());
    setCopiedIndex(null);
  };

  const handleCopyPrompt = (promptText, index) => {
    navigator.clipboard.writeText(promptText);
    setCopiedIndex(index);
  };

  const handleGoToTutor = (promptText) => {
    navigate('/tutor', { state: { initialPrompt: promptText } });
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.greeting}>
          <h1>¡Hola, <span className={styles.highlight}>{userName}</span>! 👋</h1>
          <p>¿Qué quieres aprender o resolver hoy con tu Tutor IA?</p>
        </div>
        
        <button className={styles.primaryChatBtn} onClick={() => navigate('/tutor')}>
          <MessageSquare size={18} />
          <span>Ir al Tutor</span>
        </button>
      </header>

      <section className={styles.suggestionsSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionTitle}>
            <Lightbulb className={styles.iconBulb} size={22} />
            <h2>Sugerencias para preguntar mejor a la IA</h2>
          </div>
          <button className={styles.refreshBtn} onClick={handleRefreshSuggestions} title="Obtener otras sugerencias">
            <RefreshCw size={16} />
            <span>Cambiar sugerencias</span>
          </button>
        </div>

        <div className={styles.grid}>
          {suggestions.map((item, index) => (
            <div key={index} className={styles.card}>
              <span className={styles.badge}>{item.category}</span>
              <p className={styles.promptText}>"{item.prompt}"</p>

              {copiedIndex === index ? (
                <div className={styles.actionGroup}>
                  <span className={styles.copiedBadge}>
                    <Check size={16} /> ¡Copiado!
                  </span>
                  <button 
                    className={styles.goToTutorBtn}
                    onClick={() => handleGoToTutor(item.prompt)}
                  >
                    <span>Ir al Tutor</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              ) : (
                <button 
                  className={styles.usePromptBtn}
                  onClick={() => handleCopyPrompt(item.prompt, index)}
                >
                  <span>Copiar esta pregunta</span>
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;