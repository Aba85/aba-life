import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';

export default function CadastroCompletoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [celular, setCelular] = useState('');
  const [codigoIndicacao, setCodigoIndicacao] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [showSenha, setShowSenha] = useState(false);
  const [showConfirmaSenha, setShowConfirmaSenha] = useState(false);

  const validarCPF = (cpf) => /^\d{11}$/.test(cpf);

  const handleCadastro = async () => {
    if (
      !nome.trim() || !email.trim() || !cpf.trim() ||
      !celular.trim() || !senha.trim() || !confirmaSenha.trim()
    ) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (!validarCPF(cpf)) {
      Alert.alert('Erro', 'CPF inválido. Deve conter 11 dígitos numéricos.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Erro', 'Senha deve ter no mínimo 6 caracteres.');
      return;
    }

    if (senha !== confirmaSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    try {
      const response = await axios.post('https://seu-backend-url/usuarios/cadastrar', {
        nome,
        email,
        cpf,
        celular,
        codigoIndicacao: codigoIndicacao.trim() || null,
        senha,
        perfil: 'passageiro',
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
        navigation.navigate('Login');
      } else {
        Alert.alert('Erro', 'Erro ao cadastrar.');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('Erro', error.response.data.erro || 'Erro no cadastro.');
      } else {
        Alert.alert('Erro', 'Erro de conexão. Tente novamente.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro Completo</Text>

      <TextInput
        placeholder="Nome completo"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="CPF (apenas números)"
        keyboardType="number-pad"
        style={styles.input}
        value={cpf}
        onChangeText={setCpf}
        maxLength={11}
      />
      <TextInput
        placeholder="Celular"
        keyboardType="phone-pad"
        style={styles.input}
        value={celular}
        onChangeText={setCelular}
      />
      <TextInput
        placeholder="Código de indicação (opcional)"
        style={styles.input}
        value={codigoIndicacao}
        onChangeText={setCodigoIndicacao}
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

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Confirme a senha"
          secureTextEntry={!showConfirmaSenha}
          style={[styles.input, { flex: 1 }]}
          value={confirmaSenha}
          onChangeText={setConfirmaSenha}
        />
        <TouchableOpacity
          onPress={() => setShowConfirmaSenha(!showConfirmaSenha)}
          style={styles.eyeButton}
        >
          <Text>{showConfirmaSenha ? '🙈' : '👁️'}</Text>
        </TouchableOpacity>
      </View>

      <Button title="Cadastrar" onPress={handleCadastro} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#004aad',
  },
  input: {
    borderWidth: 1,
    borderColor: '#004aad',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  eyeButton: {
    padding: 10,
  },
}); 