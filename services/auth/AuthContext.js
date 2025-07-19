// caminho: services/auth/AuthContext.js

import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fazerLogin } from '../user/userService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarUsuario = async () => {
      const tokenSalvo = await AsyncStorage.getItem('token');
      const usuarioSalvo = await AsyncStorage.getItem('usuario');

      if (tokenSalvo && usuarioSalvo) {
        setUsuario(JSON.parse(usuarioSalvo));
      }
      setCarregando(false);
    };

    carregarUsuario();
  }, []);

  const login = async (email, senha) => {
    const resultado = await fazerLogin(email, senha);
    await AsyncStorage.setItem('token', resultado.token);
    await AsyncStorage.setItem('usuario', JSON.stringify(resultado.usuario));
    setUsuario(resultado.usuario);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('usuario');
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, carregando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
