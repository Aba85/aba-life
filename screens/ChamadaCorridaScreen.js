import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../services/auth/AuthContext';
import { chamarCorrida } from '../services/corridas/corridaService';
import { pegarLocalizacaoAtual } from '../services/location/locationService';

const ChamadaCorridaScreen = () => {
  const { token } = useContext(AuthContext);
  const [localEmbarque, setLocalEmbarque] = useState('');
  const [destino, setDestino] = useState('');
  const [erro, setErro] = useState('');

  const handleChamada = async () => {
    setErro('');

    if (!localEmbarque || !destino) {
      setErro('Preencha todos os campos.');
      return;
    }

    try {
      const dadosCorrida = {
        embarque: localEmbarque,
        destino: destino,
      };

      await chamarCorrida(token, dadosCorrida);
      Alert.alert('Corrida solicitada com sucesso!');
      setLocalEmbarque('');
      setDestino('');
    } catch (error) {
      setErro(error?.erro || 'Erro ao solicitar corrida.');
    }
  };

  const preencherComLocalizacaoAtual = async () => {
    try {
      const enderecoAtual = await pegarLocalizacaoAtual();
      setLocalEmbarque(enderecoAtual);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Solicitar Corrida</Text>

      <TextInput
        placeholder="Local de embarque"
        value={localEmbarque}
        onChangeText={setLocalEmbarque}
        style={styles.input}
      />

      <TouchableOpacity style={styles.botaoLocalizacao} onPress={preencherComLocalizacaoAtual}>
        <Text style={styles.textoBotaoSecundario}>Usar Localização Atual</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="Destino"
        value={destino}
        onChangeText={setDestino}
        style={styles.input}
      />

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity style={styles.botao} onPress={handleChamada}>
        <Text style={styles.textoBotao}>Confirmar Chamada</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChamadaCorridaScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f0f4ff' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#003087', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 10, fontSize: 16 },
  botao: { backgroundColor: '#003087', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  botaoLocalizacao: { backgroundColor: '#ccc', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  textoBotaoSecundario: { color: '#003087', fontSize: 14, fontWeight: 'bold' },
  erro: { color: 'red', textAlign: 'center', marginBottom: 10 },
});
