import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const HistoricoScreen = () => {
  const [historico, setHistorico] = useState([]);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://back.abalife.com.br/corridas/historico', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHistorico(response.data);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      }
    };

    carregarHistorico();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.label}>Origem:</Text>
      <Text>{item.origem}</Text>
      <Text style={styles.label}>Destino:</Text>
      <Text>{item.destino}</Text>
      <Text style={styles.label}>Data:</Text>
      <Text>{new Date(item.data).toLocaleString()}</Text>
      <Text style={styles.label}>Valor:</Text>
      <Text>R$ {item.valor.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Corridas</Text>
      <FlatList
        data={historico}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        ListEmptyComponent={<Text style={styles.vazio}>Nenhuma corrida encontrada.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#F3F3F3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  vazio: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
});

export default HistoricoScreen;
