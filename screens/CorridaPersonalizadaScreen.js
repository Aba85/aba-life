
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CorridaPersonalizadaScreen = () => {
  const [codigoMotorista, setCodigoMotorista] = useState('');
  const [origem, setOrigem] = useState('');
  const [destino, setDestino] = useState('');
  const [dataHora, setDataHora] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);

  const solicitar = () => {
    if (!codigoMotorista || !origem || !destino) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios');
      return;
    }

    console.log('Corrida personalizada:', { codigoMotorista, origem, destino, dataHora });
    Alert.alert('Solicitação enviada', 'Aguarde a resposta do motorista');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Corrida Personalizada</Text>
      <TextInput
        style={styles.input}
        placeholder="Código do Motorista"
        value={codigoMotorista}
        onChangeText={setCodigoMotorista}
      />
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
      <Button title="Agendar Data e Hora" onPress={() => setMostrarPicker(true)} />
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
      <Text style={styles.info}>Data e hora: {dataHora.toLocaleString()}</Text>
      <Button title="Solicitar Corrida" onPress={solicitar} />
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

export default CorridaPersonalizadaScreen;
