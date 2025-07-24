// apps/passageiro/services/user/userService.js

import axios from 'axios';

const API_BASE_URL = 'https://backend-abalife.onrender.com';

export const cadastrarUsuario = async (dados) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios/cadastrar`, {
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      cpf: dados.cpf,
      celular: dados.celular,
      endereco: dados.endereco,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || { erro: 'Erro ao cadastrar usuário' };
  }
};

export const loginUsuario = async (email, senha) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/usuarios/login`, {
      email,
      senha,
    });
    return response.data;
  } catch (error) {
    throw error?.response?.data || { erro: 'Erro ao fazer login' };
  }
};
