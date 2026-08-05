import { useState, useCallback } from 'react';
import { sendMessageToGroq } from '../services/groqService';

export function useGroqChat(initialSubject = 'Programación y Desarrollo', initialLevel = 'Principiante') {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subject, setSubject] = useState(initialSubject);
  const [level, setLevel] = useState(initialLevel);

  const sendMessage = useCallback(async (content) => {
    if (!content || !content.trim() || isLoading) return;

    const userMessage = { role: 'user', content: content.trim() };

    setIsLoading(true);
    setError(null);
    setMessages((prev) => [...prev, userMessage]);

    try {
      const updatedHistory = [...messages, userMessage];
      const apiHistory = updatedHistory.map((msg) => ({
        role: msg.role,
        content: msg.content
      }));

      const replyContent = await sendMessageToGroq(apiHistory, { subject, level });
      const assistantMessage = { role: 'assistant', content: replyContent };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error('Error al enviar mensaje:', err);
      setError(err.message || 'Error al comunicarse con el tutor.');
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, subject, level]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    subject,
    setSubject,
    level,
    setLevel,
    sendMessage,
    clearChat
  };
}