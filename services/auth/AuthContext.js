import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const tokenSalvo = await AsyncStorage.getItem('@token');
        const usuarioSalvo = await AsyncStorage.getItem('@usuario');

        if (tokenSalvo && usuarioSalvo) {
          setToken(tokenSalvo);
          setUsuario(JSON.parse(usuarioSalvo));
        }
      } catch (error) {
        console.log('Erro ao carregar dados salvos:', error);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const login = async (novoToken, dadosUsuario) => {
    setToken(novoToken);
    setUsuario(dadosUsuario);
    await AsyncStorage.setItem('@token', novoToken);
    await AsyncStorage.setItem('@usuario', JSON.stringify(dadosUsuario));
  };

  const logout = async () => {
    setToken(null);
    setUsuario(null);
    await AsyncStorage.removeItem('@token');
    await AsyncStorage.removeItem('@usuario');
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};
