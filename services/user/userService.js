const API_BASE_URL = ' https://backend-abalife.onrender.com/api';

export async function cadastrarUsuario(dados) {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/cadastrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.message || 'Erro ao cadastrar usuário');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function loginUsuario(dados) {
  try {
    const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const erro = await response.json();
      throw new Error(erro.message || 'Erro ao fazer login');
    }

    const data = await response.json();
    return data.token;
  } catch (error) {
    throw error;
  }
} 