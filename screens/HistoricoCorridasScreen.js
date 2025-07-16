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

const HistoricoCorridasScreen = () => {
  const [corridas, setCorridas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarHistorico = async () => {
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await fetch('https://api.abalife.com.br/corridas/historico', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error('Erro ao buscar histórico');

        const data = await response.json();
        setCorridas(data);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar o histórico de corridas.');
      } finally {
        setCarregando(false);
      }
    };

    carregarHistorico();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.detalhe}>Origem: {item.origem}</Text>
      <Text style={styles.detalhe}>Destino: {item.destino}</Text>
      <Text style={styles.detalhe}>Data: {item.data}</Text>
      <Text style={styles.detalhe}>Valor: R$ {item.valor.toFixed(2)}</Text>
      <Text style={styles.detalhe}>Motorista: {item.motorista}</Text>
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

  if (corridas.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.mensagem}>Nenhuma corrida encontrada.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Corridas</Text>
      <FlatList
        data={corridas}
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

export default HistoricoCorridasScreen;
