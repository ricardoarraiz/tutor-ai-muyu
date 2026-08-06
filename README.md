# 🎓 Muyu Tutor IA - Plataforma EdTech

![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-v7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

**Muyu Tutor IA** es una plataforma educativa interactiva construida con **React 19** y **Vite 8**. Integra un Tutor Inteligente impulsado por IA para resolver consultas académicas en tiempo real con renderizado de Markdown y resaltado sintáctico de código.

---

## 🛠️ Stack Tecnológico

### Core & Framework
- **React 19** (`react`, `react-dom`)
- **Vite 8** (`vite`)
- **React Router 7** (`react-router-dom`)

### UI & Renderizado
- **React Markdown** (`react-markdown`) - Interpretación de respuestas enriquecidas de la IA.
- **React Syntax Highlighter** (`react-syntax-highlighter`) - Resaltado sintáctico para bloques de código.
- **Lucide React** (`lucide-react`) - Iconografía moderna y liviana.
- **CSS Modules** - Aislamiento de estilos por componente para evitar colisiones globales.

### Calidad de Código & Herramientas
- **ESLint 10** (`eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)
- **Git** - Control de versiones aplicando [Conventional Commits](https://www.conventionalcommits.org/).

---

## 🏗️ Decisiones de Arquitectura

1. **Estructura Modular por Componentes:** Se organizó el código bajo el directorio `src/components/shared/` para garantizar la reusabilidad de componentes UI (Chat, Input, layout) y facilitar el mantenimiento continuo.
2. **Separación de Lógica y Presentación (Custom Hooks):** La integración con la API del modelo de lenguaje y la gestión de estados se abstrajeron en hooks personalizados (`useGroqChat`), desacoplando la interfaz visual de la capa de datos.
3. **Encapsulamiento de Estilos con CSS Modules:** Se optó por CSS Modules sobre librerías pesadas de UI para mantener un bundle ligero, rendimiento óptimo y aislamiento completo de clases CSS.
4. **Respuesta Enriquecida:** Integración de `react-markdown` y `react-syntax-highlighter` para permitir que el Tutor IA entregue contenido estructurado con bloques de código legibles para estudiantes de programación y tecnología.
5. **Configuración Segura mediante `.env.local`:** Aislamiento de credenciales privadas e integración con variables de entorno que no son expuestas en el repositorio público.

---

## ⚙️ Instrucciones de Ejecución Local

Sigue estos pasos para clonar y ejecutar la aplicación en tu entorno local:

1. Requisitos Previos
- **Node.js** (versión 18.0.0 o superior)
- **npm** o **yarn**

2. Clonar el Repositorio
- git clone https://github.com/ricardoarraiz/tutor-ai-muyu
- cd tutor-ai-muyu

3. Instalar Dependencias
- npm install

4. Configurar Variables de Entorno (Requerido para la IA)
- Para que las funcionalidades del Tutor IA funcionen correctamente, debes crear un archivo .env.local en la raíz del proyecto y definir tu clave de API:

- VITE_GROQ_API_KEY=tu_api_key_aqui

5. Iniciar Servidor de Desarrollo
- npm run dev

🧪 Scripts Disponibles
- npm run dev: Inicia el servidor de desarrollo local con Vite.

- npm run build: Compila la aplicación optimizada para producción.

- npm run preview: Previsualiza localmente el build de producción.

- npm run lint: Ejecuta ESLint 10 para validación y estandarización de código.

🤝 Convención de Commits
- En el repositorio se aplica la convención Conventional Commits:

- feat: Nuevas funcionalidades.

- fix: Correcciones de errores de código o interfaz.

- docs: Cambios en documentación (README.md, comentarios).

- style: Formato o cambios de diseño CSS sin alterar funcionalidad.

- refactor: Reestructuración o limpieza de código.

Prueba desarrollada para Muyu Education.