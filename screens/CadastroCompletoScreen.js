import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { cadastrarUsuario } from '../services/user/userService';
import validarCPF from '../utils/validators/validators';
import PasswordField from '../components/PasswordField';

const CadastroCompletoScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [endereco, setEndereco] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleCadastro = async () => {
    if (!nome || !email || !cpf || !celular || !endereco || !senha || !confirmarSenha) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    if (!validarCPF(cpf)) {
      setErro('CPF inválido.');
      return;
    }

    if (senha.length < 6) {
      setErro('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    try {
      const dados = {
        nome,
        email,
        senha,
        cpf,
        celular: '+55' + celular.replace(/\D/g, ''),
        endereco,
      };

      await cadastrarUsuario(dados);
      Alert.alert('Cadastro realizado com sucesso!', 'Você já pode fazer login.');
      navigation.navigate('Login');
    } catch (err) {
      setErro(err?.erro || 'Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>

      <TextInput
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Celular (somente números)"
        value={celular}
        onChangeText={setCelular}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Endereço completo"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />
      <PasswordField
        label="Senha"
        value={senha}
        onChangeText={setSenha}
      />
      <PasswordField
        label="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.textoBotao}>Finalizar Cadastro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CadastroCompletoScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#f0f4ff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003087',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#003087',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});
