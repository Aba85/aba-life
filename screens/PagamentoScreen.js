import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PagamentoScreen = () => {
  const [cartao, setCartao] = useState('');
  const [cpfTitular, setCpfTitular] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarPagamento = async () => {
      const token = await AsyncStorage.getItem('token');

      try {
        const response = await fetch(
          'https://api.abalife.com.br/pagamento',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Erro ao carregar');

        const data = await response.json();
        setCartao(data.numero || '');
        setCpfTitular(data.cpf || '');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados de pagamento.');
      } finally {
        setCarregando(false);
      }
    };

    carregarPagamento();
  }, []);

  const salvar = async () => {
    const token = await AsyncStorage.getItem('token');

    if (!cartao || !cpfTitular) {
      Alert.alert('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const response = await fetch(
        'https://api.abalife.com.br/pagamento',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            numero: cartao,
            cpf: cpfTitular,
          }),
        }
      );

      if (!response.ok) throw new Error('Erro ao salvar');

      Alert.alert('Sucesso', 'Dados de pagamento atualizados.');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados.');
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
      <Text style={styles.titulo}>Forma de Pagamento</Text>

      <Text style={styles.label}>Número do Cartão:</Text>
      <TextInput
        style={styles.input}
        placeholder="**** **** **** 1234"
        value={cartao}
        onChangeText={setCartao}
        keyboardType="number-pad"
        maxLength={16}
      />

      <Text style={styles.label}>CPF do Titular:</Text>
      <TextInput
        style={styles.input}
        placeholder="000.000.000-00"
        value={cpfTitular}
        onChangeText={setCpfTitular}
        keyboardType="numeric"
        maxLength={14}
      />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.textoBotao}>Salvar</Text>
      </TouchableOpacity>
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
  label: {
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PagamentoScreen;
