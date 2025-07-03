
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const IndicarPassageiroScreen = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const gerarCodigo = () => {
    const codigo = Math.random().toString(36).substr(2, 8).toUpperCase();
    Alert.alert('Código gerado', `Compartilhe este código com o indicado: ${codigo}`);
  };

  const indicar = () => {
    console.log('Passageiro indicado:', nome, telefone);
    gerarCodigo();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Indicar um Passageiro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do indicado"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone do indicado"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />
      <Button title="Gerar Código de Indicação" onPress={indicar} />
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
    fontSize: 24,
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

export default IndicarPassageiroScreen;
