import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PrivacidadeScreen = () => {
  const [modoPrivado, setModoPrivado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarPreferencia = async () => {
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await fetch(
          'https://api.abalife.com.br/usuarios/privacidade',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Erro ao buscar dados');

        const data = await response.json();
        setModoPrivado(data.ocultar_nome);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar sua configuração de privacidade.');
      } finally {
        setCarregando(false);
      }
    };

    carregarPreferencia();
  }, []);

  const atualizarPrivacidade = async (valor) => {
    const token = await AsyncStorage.getItem('token');
    setModoPrivado(valor);

    try {
      const response = await fetch(
        'https://api.abalife.com.br/usuarios/privacidade',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ocultar_nome: valor }),
        }
      );

      if (!response.ok) throw new Error('Erro ao atualizar');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar sua configuração.');
    }
  };

  if (carregando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Privacidade</Text>
      <View style={styles.item}>
        <Text style={styles.texto}>
          Ocultar meu nome dos indicantes (modo privado)
        </Text>
        <Switch
          value={modoPrivado}
          onValueChange={atualizarPrivacidade}
          thumbColor={modoPrivado ? '#007bff' : '#ccc'}
        />
      </View>
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
    marginBottom: 32,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  texto: {
    fontSize: 16,
    flex: 1,
    paddingRight: 10,
  },
});

export default PrivacidadeScreen;
