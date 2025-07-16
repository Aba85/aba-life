// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity
} from 'react-native';
import { AuthContext } from '../services/auth/AuthContext';
import axios from 'axios';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const { signIn } = useContext(AuthContext);

  const handleLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Erro', 'Por favor, preencha email e senha.');
      return;
    }

    try {
      const response = await axios.post('https://seu-backend-url/usuarios/login', {
        email,
        senha,
      });

      if (response.status === 200) {
        signIn(response.data.usuario, response.data.token);
      } else {
        Alert.alert('Erro', 'Falha ao realizar login.');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Erro', error.response.data.erro || 'Erro no login.');
      } else {
        Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>

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
        >
          <Text>{showSenha ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#e8f0fe'
  },
  title: {
    fontSize: 24, marginBottom: 20, fontWeight: 'bold', color: '#2d4a9d', textAlign: 'center'
  },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 6, backgroundColor: '#fff'
  },
  passwordContainer: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 15
  },
  eyeButton: {
    padding: 10,
  },
}); 