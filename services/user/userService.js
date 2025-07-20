const API_URL = 'https://backend-abalife.onrender.com'; // Substitua pela URL real do seu backend, se for diferente

export const loginUsuario = async (email, senha) => {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.mensagem || 'Erro ao fazer login.');
  }

  return await response.json();
};

export const cadastrarUsuario = async (dados) => {
  const response = await fetch(`${API_URL}/usuarios/cadastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.mensagem || 'Erro ao cadastrar.');
  }

  return await response.json();
};
