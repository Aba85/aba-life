import { obterToken } from '../auth/tokenStorage';

const API_BASE_URL = 'https://api.abalife.com.br';

export const salvarCodigoIndicacao = async (passageiroId, codigo) => {
  const token = await obterToken();

  const response = await fetch(`${API_BASE_URL}/indicacoes/vincular`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ passageiroId, codigo }),
  });

  if (!response.ok) throw new Error('Erro ao vincular código');
  return await response.json();
};
