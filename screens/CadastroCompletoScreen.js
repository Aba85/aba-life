import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import PasswordField from '../components/PasswordField';
import TextInputWithMask from '../components/TextInputWithMask';
import { validateCPF, validatePhone } from '../utils/validators/validators';
import axios from 'axios';

const CadastroCompletoScreen = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const validarCampos = () => {
    if (!nome || !email || !cpf || !telefone || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return false;
    }

    if (!validateCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido.');
      return false;
    }

    if (!validatePhone(telefone)) {
      Alert.alert('Erro', 'Número de telefone inválido.');
      return false;
    }

    if (!validatePassword(senha)) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return false;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return false;
    }

    return true;
  };

  const handleCadastro = async () => {
    if (!validarCampos()) return;

    try {
      const response = await axios.post('https://backend-abalife.onrender.com/usuarios/cadastrar', {
        nome,
        email,
        cpf,
        telefone,
        senha,
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar. Tente novamente.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Criar Conta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInputWithMask
        type={'cpf'}
        value={cpf}
        onChangeText={setCpf}
        placeholder="CPF"
        keyboardType="numeric"
      />

      <TextInputWithMask
        type={'cel-phone'}
        options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Telefone"
        keyboardType="phone-pad"
      />

      <PasswordField
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
      />

      <PasswordField
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        placeholder="Confirmar senha"
      />

      <TouchableOpacity style={styles.botao} onPress={handleCadastro}>
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Já tem uma conta? Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007AFF',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007AFF',
  },
});

export default CadastroCompletoScreen;
