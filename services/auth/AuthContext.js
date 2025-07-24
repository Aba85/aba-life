// apps/passageiro/services/auth/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUsuario } from '../user/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      const tokenSalvo = await AsyncStorage.getItem('token');
      const usuarioSalvo = await AsyncStorage.getItem('usuario');
      if (tokenSalvo && usuarioSalvo) {
        setToken(tokenSalvo);
        setUsuario(JSON.parse(usuarioSalvo));
      }
      setCarregando(false);
    };
    carregarDados();
  }, []);

  const login = async (email, senha) => {
    const data = await loginUsuario(email, senha);
    setToken(data.token);
    setUsuario(data.usuario);
    await AsyncStorage.setItem('token', data.token);
    await AsyncStorage.setItem('usuario', JSON.stringify(data.usuario));
  };

  const logout = async () => {
    setToken(null);
    setUsuario(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};
