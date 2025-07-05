import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://aba.life/api/usuarios',
        {
          nome,
          email,
          senha,
        }
      );

      const { token } = response.data;

      if (token) {
        await AsyncStorage.setItem('token', token);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Erro', 'Cadastro falhou.');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      Alert.alert('Erro', 'Não foi possível concluir o cadastro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tenho uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
    color: '#1e90ff',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  link: {
    color: '#1e90ff',
    textAlign: 'center',
    fontSize: 14,
    marginTop: 8,
  },
});