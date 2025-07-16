import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const RecompensasScreen = () => {
  const [recompensas, setRecompensas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buscarRecompensas = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get('https://back.abalife.com.br/recompensas/status', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecompensas(response.data);
      } catch (error) {
        console.error('Erro ao buscar recompensas:', error);
      } finally {
        setLoading(false);
      }
    };

    buscarRecompensas();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!recompensas) {
    return (
      <View style={styles.container}>
        <Text style={styles.mensagem}>Erro ao carregar recompensas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Recompensas</Text>

      <Text style={styles.label}>Você está elegível?</Text>
      <Text style={styles.valor}>{recompensas.ehElegivel ? '✅ Sim' : '❌ Não'}</Text>

      <Text style={styles.label}>Valor por corrida dos indicados:</Text>
      <Text style={styles.valor}>R$ {recompensas.valorPorCorrida.toFixed(2)}</Text>

      <Text style={styles.label}>Total de corridas no mês:</Text>
      <Text style={styles.valor}>{recompensas.totalCorridasUltimos30Dias}</Text>

      <Text style={styles.label}>Total de indicados ativos:</Text>
      <Text style={styles.valor}>{recompensas.totalIndicadosAtivos}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  valor: {
    fontSize: 16,
    marginTop: 5,
  },
  mensagem: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
  },
});

export default RecompensasScreen;
