import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CorridaAgendadaScreen = () => {
  const [agendadas, setAgendadas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarAgendadas = async () => {
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await fetch(
          'https://api.abalife.com.br/corridas/agendadas',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Erro ao buscar corridas');

        const data = await response.json();
        setAgendadas(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as corridas agendadas.');
      } finally {
        setCarregando(false);
      }
    };

    buscarAgendadas();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.detalhe}>Origem: {item.origem}</Text>
      <Text style={styles.detalhe}>Destino: {item.destino}</Text>
      <Text style={styles.detalhe}>Data/Hora: {item.horario}</Text>
      <Text style={styles.detalhe}>Motorista preferencial: {item.motorista_nome || 'Qualquer'}</Text>
      <Text style={styles.detalhe}>Status: {item.status}</Text>
    </View>
  );

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (agendadas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.mensagem}>Nenhuma corrida agendada no momento.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Corridas Agendadas</Text>
      <FlatList
        data={agendadas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
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
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  detalhe: {
    fontSize: 15,
    marginBottom: 4,
  },
  mensagem: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default CorridaAgendadaScreen;
