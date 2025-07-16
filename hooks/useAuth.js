// apps/passageiro/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../services/auth/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
};
