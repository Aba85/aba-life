// services/auth/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setUserToken(token);
        }
      } catch (e) {
        console.log('Erro ao carregar token:', e);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('https://backend-abalife.onrender.com/usuarios/login', {
        email,
        password,
      });

      const token = response.data.token;
      await AsyncStorage.setItem('userToken', token);
      setUserToken(token);
      return { success: true };
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      return {
        success: false,
        message: error?.response?.data?.message || 'Erro ao fazer login.',
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);