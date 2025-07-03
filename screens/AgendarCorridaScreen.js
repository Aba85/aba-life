
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const AgendarCorridaScreen = () => {
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [dataHora, setDataHora] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);

  const agendar = () => {
    if (!origem || !destino) {
      Alert.alert('Campos obrigatórios', 'Preencha origem e destino');
      return;
    }

    console.log('Corrida agendada:', origem, destino, dataHora);
    Alert.alert('Sucesso', 'Corrida agendada com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Corrida</Text>
      <TextInput
        style={styles.input}
        placeholder="Origem"
        value={origem}
        onChangeText={setOrigem}
      />
      <TextInput
        style={styles.input}
        placeholder="Destino"
        value={destino}
        onChangeText={setDestino}
      />
      <Button title="Selecionar Data e Hora" onPress={() => setMostrarPicker(true)} />
      {mostrarPicker && (
        <DateTimePicker
          value={dataHora}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setMostrarPicker(false);
            if (selectedDate) setDataHora(selectedDate);
          }}
        />
      )}
      <Text style={styles.info}>Data e hora selecionada: {dataHora.toLocaleString()}</Text>
      <Button title="Agendar Corrida" onPress={agendar} />
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
  info: {
    fontSize: 14,
    marginVertical: 12,
    textAlign: 'center',
  },
});

export default AgendarCorridaScreen;
