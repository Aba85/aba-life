import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useAuth } from '../services/auth/AuthContext';

const StatusCorridaScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const buscarStatusCorrida = async () => {
    try {
      setLoading(true);
      const resposta = await fetch('https://api.abalife.com.br/corridas/status', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        setStatus(dados.status); // Ex: "aguardando", "a_caminho", "em_andamento", "finalizada"
      } else {
        setStatus('erro');
      }
    } catch (error) {
      setStatus('erro');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarStatusCorrida();
    const interval = setInterval(buscarStatusCorrida, 8000); // Atualiza a cada 8 segundos
    return () => clearInterval(interval);
  }, []);

  const renderizarStatus = () => {
    switch (status) {
      case 'aguardando':
        return 'Aguardando motorista aceitar...';
      case 'a_caminho':
        return 'Motorista a caminho do embarque!';
      case 'em_andamento':
        return 'Corrida em andamento...';
      case 'finalizada':
        return 'Corrida finalizada.';
      case 'sem_motorista':
        return 'Nenhum motorista disponível no momento.';
      case 'erro':
        return 'Erro ao buscar status da corrida.';
      default:
        return 'Buscando status...';
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#2e7dff" />
      ) : (
        <>
          <Text style={styles.statusText}>{renderizarStatus()}</Text>
          <Button title="Voltar para Início" onPress={() => navigation.navigate('Home')} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  statusText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
});

export default StatusCorridaScreen;
