import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { InputField, PasswordField, CustomButton, Logo, LoadingOverlay } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { API_BASE_URL } from '../constants';

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        await login(data.token);
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
      } else {
        Alert.alert('Erro', data?.mensagem || 'Credenciais inválidas.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay message="Entrando..." />}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Logo />
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />
        <PasswordField
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          placeholder="Digite sua senha"
        />
        <CustomButton title="Entrar" onPress={handleLogin} />
        <CustomButton
          title="Criar conta"
          onPress={() => navigation.navigate('Register')}
          backgroundColor="#ccc"
          textColor="#000"
        />
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export default LoginScreen;