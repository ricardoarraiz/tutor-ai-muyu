const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const LEVEL_INSTRUCTIONS = {
  Principiante: `
- Explica conceptos usando analogías simples de la vida cotidiana.
- Evita jerga técnica innecesaria o defínela amablemente si la usas.
- Proporciona código simple, corto (3-5 líneas) y altamente comentado.
- Mantén un tono alentador y guía paso a paso.`,

  Intermedio: `
- Da explicaciones directas con buena profundidad técnica.
- Incluye términos técnicos estándar de la industria.
- Muestra ejemplos de código estructurados con buenas prácticas.
- Menciona casos de uso prácticos en proyectos reales.`,

  Avanzado: `
- Sé altamente técnico, conciso y ve directo al grano.
- Enfócate en arquitectura, rendimiento, optimización y casos de borde (edge cases).
- Muestra código avanzado con manejo de errores, patrones de diseño o sintaxis moderna.
- Asume que el usuario domina los fundamentos y evita explicaciones introductorias.`
};

export async function sendMessageToGroq(messages, { subject = 'Programación y Desarrollo', level = 'Principiante' } = {}) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error('No se encontró la variable VITE_GROQ_API_KEY en tu archivo .env.local');
  }

  const levelGuidelines = LEVEL_INSTRUCTIONS[level] || LEVEL_INSTRUCTIONS.Principiante;

  const systemPrompt = `Eres Muyu AI, un tutor educativo de Inteligencia Artificial altamente capacitado.
Materia actual: **${subject}**
Nivel de dificultad objetivo: **${level}**

Directrices de respuesta para este nivel:
${levelGuidelines}

Requisito de formato:
Responde siempre usando Markdown bien estructurado y bloques de código con sintaxis especificada cuando aplique.`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.trim()}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error?.message || `Error HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Sin respuesta del tutor.';
  } catch (err) {
    console.error('Error en groqService:', err);
    throw new Error(err.message || 'Error de conexión con el servicio de IA.', { cause: err });
  }
}