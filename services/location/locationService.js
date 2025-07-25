import * as Location from 'expo-location';

export const pegarLocalizacaoAtual = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Permissão de localização negada');
  }

  const local = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = local.coords;

  const response = await Location.reverseGeocodeAsync({ latitude, longitude });

  if (!response || response.length === 0) {
    throw new Error('Não foi possível obter o endereço atual');
  }

  const endereco = response[0];

  // Monta endereço em texto simples
  return `${endereco.street || ''}, ${endereco.subregion || ''} - ${endereco.region || ''}`;
};
