import { useRef, useEffect } from 'react';
import { Trash2, AlertCircle, Sparkles, MessageSquare } from 'lucide-react';
import { useGroqChat } from '../../../hooks/useGroqChat';
import TopicSelector from './TopicSelector';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import styles from './ChatInterface.module.css';

export default function ChatInterface() {
  const { 
    subject, 
    setSubject, 
    level, 
    setLevel, 
    messages, 
    isLoading, 
    error, 
    sendMessage, 
    clearChat 
  } = useGroqChat();

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const hasNoMessages = !messages || messages.length === 0;

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.headerTitle}>
            <Sparkles className={styles.headerIcon} size={20} />
            <h2>Tutor Educativo IA</h2>
          </div>
          <TopicSelector 
            subject={subject} 
            setSubject={setSubject} 
            level={level} 
            setLevel={setLevel} 
            disabled={isLoading}
          />
        </div>
        <button 
          className={styles.clearBtn} 
          onClick={clearChat} 
          title="Limpiar conversación"
          aria-label="Limpiar conversación"
          disabled={isLoading || hasNoMessages}
        >
          <Trash2 size={16} />
          <span>Limpiar</span>
        </button>
      </header>

      <div className={styles.messagesContainer}>
        {hasNoMessages && !isLoading && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIconWrapper}>
              <MessageSquare size={32} />
            </div>
            <h3>¡Hola! Soy Muyu AI</h3>
            <p>Pregúntale lo que quieras sobre <strong>{subject}</strong> en nivel <strong>{level}</strong> para comenzar.</p>
          </div>
        )}

        {!hasNoMessages && messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}

        {isLoading && (
          <div className={styles.loadingState}>
            <div className={styles.typingIndicator}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p>Muyu AI está razonando la respuesta para {subject} ({level})...</p>
          </div>
        )}

        {error && (
          <div className={styles.errorBox}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <footer className={styles.inputContainer}>
        <ChatInput onSendMessage={sendMessage} disabled={isLoading} />
      </footer>
    </div>
  );
}