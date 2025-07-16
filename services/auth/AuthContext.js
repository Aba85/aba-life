// services/auth/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorage() {
      try {
        const storagedUser = await AsyncStorage.getItem('@AbaLife:user');
        const storagedToken = await AsyncStorage.getItem('@AbaLife:token');
        if (storagedUser && storagedToken) {
          setUser(JSON.parse(storagedUser));
          setToken(storagedToken);
        }
      } catch (error) {
        console.log('Erro carregando armazenamento:', error);
      } finally {
        setLoading(false);
      }
    }
    loadStorage();
  }, []);

  const signIn = async (userData, userToken) => {
    setUser(userData);
    setToken(userToken);

    await AsyncStorage.setItem('@AbaLife:user', JSON.stringify(userData));
    await AsyncStorage.setItem('@AbaLife:token', userToken);
  };

  const signOut = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem('@AbaLife:user');
    await AsyncStorage.removeItem('@AbaLife:token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}; 