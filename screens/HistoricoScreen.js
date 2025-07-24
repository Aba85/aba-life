import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getHistorico } from '../services/corridas/corridaService';
import { AuthContext } from '../services/auth/AuthContext';

const HistoricoScreen = () => {
  const { token } = useContext(AuthContext);
  const [corridas, setCorridas] = useState([]);

  useEffect(() => {
    const carregarHistorico = async () => {
      try {
        const data = await getHistorico(token);
        setCorridas(data || []);
      } catch (error) {
        console.log('Erro ao carregar histórico:', error);
      }
    };

    carregarHistorico();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Corridas</Text>
      <FlatList
        data={corridas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.texto}>De: {item.embarque}</Text>
            <Text style={styles.texto}>Para: {item.destino}</Text>
            <Text style={styles.texto}>Status: {item.status}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.texto}>Nenhuma corrida encontrada.</Text>}
      />
    </View>
  );
};

export default HistoricoScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4ff' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#003087', marginBottom: 10 },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  texto: { fontSize: 16, color: '#333' },
});

