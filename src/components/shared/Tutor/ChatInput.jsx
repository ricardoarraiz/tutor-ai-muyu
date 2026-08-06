import { useState, useEffect, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import styles from './ChatInput.module.css';

export default function ChatInput({ initialValue = '', onSendMessage, disabled }) {
  const [input, setInput] = useState(initialValue);
  const [prevInitialValue, setPrevInitialValue] = useState(initialValue);
  const textareaRef = useRef(null);

  if (initialValue !== prevInitialValue) {
    setPrevInitialValue(initialValue);
    setInput(initialValue);
  }

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className={styles.inputForm} onSubmit={handleSubmit}>
      <textarea
        ref={textareaRef}
        className={styles.textarea}
        placeholder="Hazle una pregunta a tu Tutor IA..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        rows={1}
      />
      <button 
        type="submit" 
        className={styles.sendButton} 
        disabled={disabled || !input.trim()}
        aria-label="Enviar mensaje"
      >
        {disabled ? <Loader2 size={18} className={styles.spinner} /> : <Send size={18} />}
      </button>
    </form>
  );
}