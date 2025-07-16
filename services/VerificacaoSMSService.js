// apps/passageiro/services/VerificacaoSMSService.js

import axios from 'axios';

const API_URL = 'https://api.abalife.com.br'; // Substitua se necessário

export async function enviarCodigoSMS(numero) {
  try {
    const response = await axios.post(`${API_URL}/verificacao/enviar-sms`, {
      numero,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao enviar código SMS:', error);
    throw error.response?.data?.mensagem || 'Erro ao enviar SMS.';
  }
}

export async function verificarCodigoSMS(numero, codigo) {
  try {
    const response = await axios.post(`${API_URL}/verificacao/verificar-sms`, {
      numero,
      codigo,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao verificar código SMS:', error);
    throw error.response?.data?.mensagem || 'Código incorreto.';
  }
}
