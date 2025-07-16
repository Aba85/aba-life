import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../services/auth/AuthContext';
import { salvarCodigoIndicacao } from '../services/indicacao/indicacaoService';

export default function IndicacaoScreen() {
  const { usuario } = useContext(AuthContext);
  const [codigo, setCodigo] = useState('');

  const handleSalvar = async () => {
    if (!codigo) return Alert.alert('Informe o código de indicação');

    try {
      await salvarCodigoIndicacao(usuario.id, codigo);
      Alert.alert('Código vinculado com sucesso!');
      setCodigo('');
    } catch {
      Alert.alert('Erro ao salvar código');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indicação</Text>
      <TextInput
        placeholder="Digite o código recebido"
        style={styles.input}
        value={codigo}
        onChangeText={setCodigo}
      />
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>Vincular Código</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#FFF' },
  title: { fontSize: 22, color: '#0066CC', fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#CCC', padding: 12, borderRadius: 8, marginBottom: 12 },
  button: { backgroundColor: '#0066CC', padding: 14, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});
