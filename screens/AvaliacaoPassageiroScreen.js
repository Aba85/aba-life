
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AvaliacaoPassageiroScreen = () => {
  const [nota, setNota] = useState('');
  const [confirmacaoIdentidade, setConfirmacaoIdentidade] = useState('');

  const enviarAvaliacao = () => {
    console.log('Nota enviada:', nota);
    console.log('Identidade confirmada?', confirmacaoIdentidade);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avaliação do Passageiro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nota de 1 a 5"
        value={nota}
        onChangeText={setNota}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="A identidade da pessoa era a mesma da foto? (sim/não)"
        value={confirmacaoIdentidade}
        onChangeText={setConfirmacaoIdentidade}
      />
      <Button title="Enviar Avaliação" onPress={enviarAvaliacao} />
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

export default AvaliacaoPassageiroScreen;
