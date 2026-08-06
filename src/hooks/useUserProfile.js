import { useState } from 'react';

const STORAGE_KEY = 'muyu_user_profile';

const DEFAULT_PROFILE = {
  name: 'Ricardo Arraiz',
  role: 'estudiante',
  email: 'usuario@muyu.edu',
  defaultLevel: 'Principiante',
  notificationsEnabled: true
};

export function useUserProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch (err) {
      console.error('Error al cargar perfil desde localStorage:', err);
      return DEFAULT_PROFILE;
    }
  });

  const [isSaved, setIsSaved] = useState(false);

  const updateProfile = (updatedFields) => {
    setProfile((prev) => {
      const newProfile = { ...prev, ...updatedFields };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile));
      } catch (err) {
        console.error('Error al guardar perfil en localStorage:', err);
      }
      return newProfile;
    });

    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return {
    profile,
    updateProfile,
    isSaved
  };
}