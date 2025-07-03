import { API_BASE_URL } from '../constants';

export const loginUser = async (email, senha) => {
  try {
    const response = await fetch(\`\${API_BASE_URL}/usuarios/login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    return await response.json();
  } catch (error) {
    throw new Error('Erro ao conectar com o servidor.');
  }
};

export const registerUser = async (dados) => {
  try {
    const response = await fetch(\`\${API_BASE_URL}/usuarios/cadastro\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    return await response.json();
  } catch (error) {
    throw new Error('Erro ao conectar com o servidor.');
  }
};