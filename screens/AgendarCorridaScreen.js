import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function AgendarCorridaScreen() {
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [local, setLocal] = useState('');

  const handleAgendar = () => {
    if (!data || !hora || !local) {
      return Alert.alert('Preencha todos os campos');
    }

    Alert.alert('Corrida agendada com sucesso!');
    setData('');
    setHora('');
    setLocal('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agendar Corrida</Text>

      <TextInput
        placeholder="Data (DD/MM/AAAA)"
        style={styles.input}
        value={data}
        onChangeText={setData}
      />
      <TextInput
        placeholder="Hora (HH:MM)"
        style={styles.input}
        value={hora}
        onChangeText={setHora}
      />
      <TextInput
        placeholder="Local de embarque"
        style={styles.input}
        value={local}
        onChangeText={setLocal}
      />

      <TouchableOpacity style={styles.botao} onPress={handleAgendar}>
        <Text style={styles.botaoTexto}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFF',
  },
  titulo: {
    fontSize: 22,
    color: '#0066CC',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  botao: {
    backgroundColor: '#0066CC',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
