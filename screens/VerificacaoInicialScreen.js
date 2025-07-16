import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

const VerificacaoInicialScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [confirmarCelular, setConfirmarCelular] = useState('');
  const [canal, setCanal] = useState(null); // 'email' ou 'sms'
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [codigo, setCodigo] = useState('');
  const [codigoGerado, setCodigoGerado] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const gerarCodigo = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const validarDados = () => {
    if (!email || !confirmarEmail || !celular || !confirmarCelular) {
      setErro('Preencha todos os campos.');
      return false;
    }
    if (email !== confirmarEmail) {
      setErro('Os e-mails não coincidem.');
      return false;
    }
    if (celular !== confirmarCelular) {
      setErro('Os números de celular não coincidem.');
      return false;
    }
    if (!canal) {
      setErro('Escolha um canal para envio do código.');
      return false;
    }
    return true;
  };

  const enviarCodigo = async () => {
    setErro('');
    if (!validarDados()) return;

    const novoCodigo = gerarCodigo();
    setCodigoGerado(novoCodigo);
    setCarregando(true);

    try {
      // Simula envio do código (em produção, use integração real)
      setTimeout(() => {
        setCarregando(false);
        setCodigoEnviado(true);
        Alert.alert(
          'Código enviado',
          `Seu código foi enviado via ${canal === 'email' ? 'e-mail' : 'SMS'}. Código: ${novoCodigo}`
        );
      }, 1000);
    } catch (error) {
      setCarregando(false);
      setErro('Erro ao enviar código. Tente novamente.');
    }
  };

  const validarCodigo = () => {
    if (codigo === codigoGerado) {
      navigation.navigate('CadastroCompleto', {
        email,
        celular,
      });
    } else {
      Alert.alert('Código incorreto', 'Verifique o código digitado e tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Verificação Inicial</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar e-mail"
        value={confirmarEmail}
        onChangeText={setConfirmarEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Número de celular"
        value={celular}
        onChangeText={setCelular}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar número de celular"
        value={confirmarCelular}
        onChangeText={setConfirmarCelular}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Escolha o canal de verificação:</Text>
      <View style={styles.opcoes}>
        <TouchableOpacity
          style={[styles.opcao, canal === 'email' && styles.opcaoSelecionada]}
          onPress={() => setCanal('email')}
        >
          <Text style={styles.opcaoTexto}>E-mail</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.opcao, canal === 'sms' && styles.opcaoSelecionada]}
          onPress={() => setCanal('sms')}
        >
          <Text style={styles.opcaoTexto}>SMS</Text>
        </TouchableOpacity>
      </View>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      {!codigoEnviado ? (
        <TouchableOpacity style={styles.botao} onPress={enviarCodigo} disabled={carregando}>
          {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.botaoTexto}>Enviar Código</Text>}
        </TouchableOpacity>
      ) : (
        <>
          <TextInput
            style={styles.input}
            placeholder="Digite o código recebido"
            value={codigo}
            onChangeText={setCodigo}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.botao} onPress={validarCodigo}>
            <Text style={styles.botaoTexto}>Validar Código</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  opcoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  opcao: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  opcaoSelecionada: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  opcaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  erro: {
    color: '#d00',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default VerificacaoInicialScreen; 
