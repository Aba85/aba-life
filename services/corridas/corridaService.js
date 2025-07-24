// apps/passageiro/services/corrida/corridaService.js

import axios from 'axios';

const API_BASE_URL = 'https://backend-abalife.onrender.com';

export const chamarCorrida = async (token, dadosCorrida) => {
  const response = await axios.post(`${API_BASE_URL}/corridas/chamar`, dadosCorrida, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getHistorico = async (token) => {
  const response = await axios.get(`${API_BASE_URL}/corridas/historico`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
