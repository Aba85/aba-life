import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);

  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Email e senha são obrigatórios.');
      return;
    }

    try {
      const response = await axios.post('https://abalife-backend.onrender.com/usuarios/login', {
        email,
        senha,
      });

      if (response.status === 200) {
        const { token, usuario } = response.data;
        await signIn(token, usuario);
        // Navegar para a Home após login
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        Alert.alert('Erro', 'Erro ao fazer login.');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Erro', error.response.data.erro || 'Email ou senha incorretos.');
      } else {
        Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Senha"
          secureTextEntry={!showSenha}
          style={[styles.input, { flex: 1 }]}
          value={senha}
          onChangeText={setSenha}
        />
        <TouchableOpacity
          onPress={() => setShowSenha(!showSenha)}
          style={styles.eyeButton}
          accessibilityLabel="Mostrar ou ocultar senha"
        >
          <Text>{showSenha ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Entrar" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate('CadastroCompleto')}>
        <Text style={styles.link}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#004aad',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#004aad',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  eyeButton: {
    padding: 10,
  },
  link: {
    marginTop: 20,
    color: '#004aad',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
}); 