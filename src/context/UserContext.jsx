import { createContext, useState, useEffect, useContext } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('muyu_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.error('Error al parsear el usuario desde localStorage:', error);
      }
    }
    return {
      fullName: '',
      email: '',
      role: 'student',
      level: 'principiante'
    };
  });

  useEffect(() => {
    localStorage.setItem('muyu_user', JSON.stringify(user));
  }, [user]);

  const updateUser = (newData) => {
    setUser((prev) => ({
      ...prev,
      ...newData
    }));
  };

  const clearUser = () => {
    localStorage.removeItem('muyu_user');
    setUser({
      fullName: '',
      email: '',
      role: 'student',
      level: 'principiante'
    });
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
}