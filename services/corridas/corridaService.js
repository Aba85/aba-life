import api from '../api';

export const chamarCorrida = async (dados, token) => {
  try {
    const response = await api.post('/corridas/chamar', dados, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const cancelarCorrida = async (corridaId, token) => {
  try {
    const response = await api.post(`/corridas/${corridaId}/cancelar`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
