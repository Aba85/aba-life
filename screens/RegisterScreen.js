import React, { useState } from 'react';
import { View, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { InputField, PasswordField, CustomButton, Logo, LoadingOverlay } from '../components';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../constants';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nomeExibicao, setNomeExibicao] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmarSenha || !nomeExibicao) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/usuarios/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          email,
          senha,
          nomeExibicao,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sucesso', 'Conta criada com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', data?.mensagem || 'Erro ao criar conta.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível conectar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingOverlay message="Criando conta..." />}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Logo />
          <InputField
            label="Nome completo"
            value={nome}
            onChangeText={setNome}
            placeholder="Digite seu nome"
          />
          <InputField
            label="Nome de exibição"
            value={nomeExibicao}
            onChangeText={setNomeExibicao}
            placeholder="Como deseja ser chamado"
          />
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
          <PasswordField
            label="Confirmar senha"
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            placeholder="Repita sua senha"
          />
          <CustomButton title="Criar conta" onPress={handleRegister} />
          <CustomButton
            title="Voltar"
            onPress={() => navigation.goBack()}
            backgroundColor="#ccc"
            textColor="#000"
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
});

export default RegisterScreen;