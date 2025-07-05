import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import API_URL from '../utils/config';

export default function CadastroCompletoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { usuarioId } = route.params;

  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [nomeExibicao, setNomeExibicao] = useState('');
  const [cartao, setCartao] = useState('');

  const handleFinalizarCadastro = async () => {
    if (!cpf || !endereco || !nomeExibicao || !cartao) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch(${API_URL}/usuarios/cadastro-completo/${usuarioId}, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cpf,
          endereco,
          nome_exibicao: nomeExibicao,
          cartao,
        }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Cadastro finalizado com sucesso!');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        const data = await response.json();
        Alert.alert('Erro', data.message || 'Não foi possível finalizar o cadastro.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro de conexão com o servidor.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro Completo</Text>

        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={endereco}
          onChangeText={setEndereco}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome de exibição"
          value={nomeExibicao}
          onChangeText={setNomeExibicao}
        />
        <TextInput
          style={styles.input}
          placeholder="Número do cartão"
          value={cartao}
          onChangeText={setCartao}
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.button} onPress={handleFinalizarCadastro}>
          <Text style={styles.buttonText}>Finalizar Cadastro</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});