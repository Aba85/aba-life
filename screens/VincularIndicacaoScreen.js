
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const VincularIndicacaoScreen = () => {
  const [codigo, setCodigo] = useState('');

  const vincularCodigo = () => {
    if (codigo.length < 6) {
      Alert.alert('Código inválido', 'O código de indicação deve ter pelo menos 6 caracteres.');
    } else {
      console.log('Código vinculado:', codigo);
      Alert.alert('Sucesso', 'Código de indicação vinculado com sucesso!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vincular Código de Indicação</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o código recebido"
        value={codigo}
        onChangeText={setCodigo}
      />
      <Button title="Vincular" onPress={vincularCodigo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default VincularIndicacaoScreen;
