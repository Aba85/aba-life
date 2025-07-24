// apps/passageiro/screens/LoginScreen.js

import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../services/auth/AuthContext';

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async () => {
    setCarregando(true);
    setErro('');
    try {
      await login(email, senha);
    } catch (err) {
      setErro(err?.erro || 'Erro ao fazer login');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Aba Life - Passageiro</Text>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={carregando}>
        {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBotao}>Entrar</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f0f4ff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#003087' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, fontSize: 16 },
  botao: { backgroundColor: '#003087', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { marginTop: 20, textAlign: 'center', color: '#003087', fontWeight: 'bold' },
  erro: { color: 'red', textAlign: 'center', marginBottom: 10 },
});
