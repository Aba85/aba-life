import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AguardandoMotoristaScreen = () => {
  const [status, setStatus] = useState('Procurando motorista...');
  const [motorista, setMotorista] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const verificarStatus = async () => {
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await fetch(
          'https://api.abalife.com.br/corridas/status',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Erro ao verificar status');

        const data = await response.json();

        if (data.status === 'aceita') {
          setStatus('Corrida aceita!');
          setMotorista(data.motorista);
        } else {
          setStatus('Procurando motorista...');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível verificar o status da corrida.');
      } finally {
        setCarregando(false);
      }
    };

    const intervalo = setInterval(verificarStatus, 5000);
    verificarStatus(); // chamada imediata

    return () => clearInterval(intervalo);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Aguardando Motorista</Text>

      {carregando ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          <Text style={styles.status}>{status}</Text>

          {motorista && (
            <View style={styles.card}>
              <Text style={styles.info}>Nome: {motorista.nome}</Text>
              <Text style={styles.info}>Carro: {motorista.veiculo}</Text>
              <Text style={styles.info}>Placa: {motorista.placa}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  status: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 18,
    borderRadius: 10,
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
  },
});

export default AguardandoMotoristaScreen;
