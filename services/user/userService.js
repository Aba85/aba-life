import axios from 'axios';

const API_URL = 'https://backend-abalife.onrender.com/usuarios';

export const cadastrarUsuario = async (dados) => {
  try {
    const response = await axios.post(`${API_URL}/cadastrar`, dados);
    return response.data;
  } catch (error) {
    if (error.response?.data?.erro) {
      throw new Error(error.response.data.erro);
    }
    throw new Error('Erro ao cadastrar. Tente novamente mais tarde.');
  }
}; 