import axios from 'axios';

const API_BASE_URL = 'https://backend-abalife.onrender.com';

export const chamarCorrida = async (token, dadosCorrida) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/corridas/chamar`, dadosCorrida, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('❌ Erro ao chamar corrida:', error.response?.data || error.message);
    throw error.response?.data || { erro: 'Erro ao chamar corrida.' };
  }
};
