// apps/passageiro/services/recompensa/recompensaService.js

import axios from 'axios';

const API_BASE_URL = 'https://backend-abalife.onrender.com';

export const getRecompensas = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/usuarios/recompensas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
