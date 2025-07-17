// caminho: services/user/userService.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://backend-abalife.onrender.com';

const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const buscarSaldo = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios/saldo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.saldo;
  } catch (error) {
    console.error('Erro ao buscar saldo:', error);
    return null;
  }
};

export const buscarRecompensas = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios/recompensas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar recompensas:', error);
    return null;
  }
};

export const buscarCodigoIndicacao = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios/codigo-indicacao`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.codigo;
  } catch (error) {
    console.error('Erro ao buscar código de indicação:', error);
    return null;
  }
};

export const verificarBloqueio = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios/bloqueio`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data; // { bloqueado: true, motivo: '', tempoRestante: '' }
  } catch (error) {
    console.error('Erro ao verificar bloqueio:', error);
    return null;
  }
};

export const verificarPermissaoIA = async () => {
  const token = await getToken();
  try {
    const response = await axios.get(`${API_BASE_URL}/usuarios/permissao-ia`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.permitido;
  } catch (error) {
    console.error('Erro ao verificar permissão de IA:', error);
    return false;
  }
};
