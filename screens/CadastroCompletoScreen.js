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

  const validatePassword = (password) => {
    return password.length >= 6;
  };

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

      <View style={styles.card}>
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
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInputWithMask
          type={'cpf'}
          value={cpf}
          onChangeText={setCpf}
          placeholder="CPF"
          keyboardType="numeric"
          style={styles.input}
        />

        <TextInputWithMask
          type={'cel-phone'}
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '+55 (99) '
          }}
          value={telefone}
          onChangeText={setTelefone}
          placeholder="Telefone"
          keyboardType="phone-pad"
          style={styles.input}
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
      </View>

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
    backgroundColor: '#F8F9FA',
    flexGrow: 1,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#007AFF',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  link: {
    marginTop: 25,
    textAlign: 'center',
    color: '#007AFF',
    fontSize: 15,
  },
});

export default CadastroCompletoScreen;