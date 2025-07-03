
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const HistoricoCorridasScreen = () => {
  const [corridas, setCorridas] = useState([]);

  useEffect(() => {
    // Simulação de carregamento do histórico
    setCorridas([
      { id: '1', origem: 'Rua A', destino: 'Av. B', data: '01/07/2025', valor: 'R$ 12,00' },
      { id: '2', origem: 'Av. X', destino: 'Rua Y', data: '28/06/2025', valor: 'R$ 18,50' },
      { id: '3', origem: 'Praça 1', destino: 'Terminal Z', data: '25/06/2025', valor: 'R$ 22,00' },
    ]);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.label}>De: {item.origem}</Text>
      <Text style={styles.label}>Para: {item.destino}</Text>
      <Text style={styles.details}>Data: {item.data} - Valor: {item.valor}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Corridas</Text>
      <FlatList
        data={corridas}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default HistoricoCorridasScreen;
