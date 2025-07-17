// caminho: services/auth/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [carregando, setCarregando] = useState(true);

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
        console.error('Erro ao carregar dados do usuário:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const signIn = async (email, senha) => {
    try {
      const response = await axios.post(
        'https://backend-abalife.onrender.com/usuarios/login',
        { email, senha }
      );

      const { token, usuario } = response.data;
      setToken(token);
      setUsuario(usuario);
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
      return { sucesso: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { sucesso: false, mensagem: 'Credenciais inválidas' };
    }
  };

  const signOut = async () => {
    setToken(null);
    setUsuario(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('usuario');
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        token,
        carregando,
        signIn,
        signOut,
        setUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
