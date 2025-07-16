import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CorridaEmAndamentoScreen = () => {
  const [corrida, setCorrida] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarCorridaAtiva = async () => {
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await fetch(
          'https://api.abalife.com.br/corridas/ativa',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Erro ao buscar corrida');

        const data = await response.json();
        setCorrida(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar a corrida em andamento.');
      } finally {
        setCarregando(false);
      }
    };

    buscarCorridaAtiva();
  }, []);

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!corrida) {
    return (
      <View style={styles.container}>
        <Text style={styles.mensagem}>Nenhuma corrida em andamento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Corrida em Andamento</Text>

      <View style={styles.card}>
        <Text style={styles.info}>Origem: {corrida.origem}</Text>
        <Text style={styles.info}>Destino: {corrida.destino}</Text>
        <Text style={styles.info}>Motorista: {corrida.motorista_nome}</Text>
        <Text style={styles.info}>Veículo: {corrida.veiculo}</Text>
        <Text style={styles.info}>Status: {corrida.status}</Text>
        <Text style={styles.info}>
          Iniciada em: {corrida.horario_inicio || 'Não informado'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.botaoCancelar}
        onPress={() => Alert.alert('Aviso', 'Cancelar corrida não implementado ainda.')}
      >
        <Text style={styles.botaoTexto}>Cancelar Corrida</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 18,
    borderRadius: 10,
    marginBottom: 24,
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
  },
  mensagem: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
  botaoCancelar: {
    backgroundColor: '#dc3545',
    padding: 14,
    borderRadius: 8,
  },
  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CorridaEmAndamentoScreen;
