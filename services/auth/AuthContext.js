// apps/passageiro/services/auth/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const URL_BASE = ' https://backend-abalife.onrender.com';

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const tokenSalvo = await AsyncStorage.getItem('token');
        const usuarioSalvo = await AsyncStorage.getItem('usuario');

        if (tokenSalvo && usuarioSalvo) {
          setToken(tokenSalvo);
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await axios.post(`${URL_BASE}/usuarios/login`, {
        email,
        senha,
      });

      const { token, usuario } = response.data;

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));

      setToken(token);
      setUsuario(usuario);

      return { sucesso: true };
    } catch (error) {
      console.error('Erro no login:', error.response?.data || error.message);
      return {
        sucesso: false,
        mensagem:
          error.response?.data?.mensagem || 'Erro ao fazer login. Verifique os dados.',
      };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('usuario');
      setToken(null);
      setUsuario(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 