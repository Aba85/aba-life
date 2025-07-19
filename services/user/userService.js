// caminho: services/user/userService.js

export const cadastrarUsuario = async (dados) => {
  try {
    const response = await fetch('https://backend-abalife.onrender.com/usuarios/cadastrar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensagem || 'Erro ao cadastrar');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    throw error;
  }
};

export const fazerLogin = async (email, senha) => {
  try {
    const response = await fetch('https://backend-abalife.onrender.com/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensagem || 'Erro ao fazer login');
    }

    return await response.json();
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};
