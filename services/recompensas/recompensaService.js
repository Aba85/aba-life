export const getRecompensasInfo = async (token) => {
  try {
    const response = await fetch('https://abalife.com.br/api/recompensas/status', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar status de recompensas');
    }

    const data = await response.json();
    return {
      ehElegivel: data.ehElegivel,
      quantidadeCorridasUltimos30Dias: data.quantidadeCorridasUltimos30Dias,
      notaMedia: data.notaMedia,
      valorPorCorrida: data.valorPorCorrida,
    };
  } catch (error) {
    console.error('Erro ao carregar recompensas:', error.message);
    return null;
  }
};
