import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthContext } from '../services/auth/AuthContext';

const ChamadaCorridaScreen = () => {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [carregando, setCarregando] = useState(false);
  const { usuario } = useContext(AuthContext);

  const chamarCorrida = async () => {
    if (!origem || !destino) {
      Alert.alert('Erro', 'Preencha origem e destino para continuar.');
      return;
    }

    setCarregando(true);

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'https://back.abalife.com.br/corridas/chamar',
        {
          origem,
          destino,
          observacoes,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Corrida solicitada!', 'Aguardando motorista disponível.');
      setOrigem('');
      setDestino('');
      setObservacoes('');
    } catch (error) {
      console.error('Erro ao chamar corrida:', error);
      Alert.alert('Erro', 'Não foi possível chamar a corrida.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Chamar Corrida</Text>

      <TextInput
        style={styles.input}
        placeholder="Local de origem"
        value={origem}
        onChangeText={setOrigem}
      />

      <TextInput
        style={styles.input}
        placeholder="Destino"
        value={destino}
        onChangeText={setDestino}
      />

      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Observações (opcional)"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />

      <TouchableOpacity style={styles.botao} onPress={chamarCorrida} disabled={carregando}>
        {carregando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Confirmar Corrida</Text>
        )}
      </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ChamadaCorridaScreen;
