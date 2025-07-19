// apps/passageiro/services/userService.js

const API_URL = 'https://backend-abalife.onrender.com';

export const cadastrarUsuario = async ({ nome, email, senha }) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/cadastrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nome, email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.erro || 'Erro ao cadastrar usuário');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const loginUsuario = async ({ email, senha }) => {
  try {
    const response = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.erro || 'Erro ao fazer login');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
