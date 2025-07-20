import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://backend-abalife.onrender.com';

export const login = async (email, senha) => {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer login');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro no serviço de login:', error);
    throw error;
  }
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('usuario');
};

export const storeTokenAndUser = async (token, usuario) => {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
};

export const getTokenAndUser = async () => {
  const token = await AsyncStorage.getItem('token');
  const usuario = await AsyncStorage.getItem('usuario');
  return {
    token,
    usuario: usuario ? JSON.parse(usuario) : null,
  };
};
