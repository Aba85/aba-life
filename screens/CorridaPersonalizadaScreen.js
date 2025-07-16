import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import corridaService from '../services/corridaService';
import { AuthContext } from '../services/auth/AuthContext';

const CorridaPersonalizadaScreen = () => {
  const { token } = useContext(AuthContext);

  const [codigoMotorista, setCodigoMotorista] = useState('');
  const [pontoEmbarque, setPontoEmbarque] = useState('');
  const [pontoDestino, setPontoDestino] = useState('');
  const [dataHora, setDataHora] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [usarAgendamento, setUsarAgendamento] = useState(false);

  const handleChamarCorrida = async () => {
    if (!codigoMotorista || !pontoEmbarque || !pontoDestino) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const dados = {
        codigoMotorista,
        pontoEmbarque,
        pontoDestino,
        agendamento: usarAgendamento ? dataHora.toISOString() : null,
      };

      const response = await corridaService.chamarCorridaPersonalizada(token, dados);
      Alert.alert('Sucesso', 'Corrida personalizada solicitada com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível solicitar a corrida.');
      console.error('Erro ao chamar corrida personalizada:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Corrida Personalizada</Text>

      <TextInput
        style={styles.input}
        placeholder="Código do motorista"
        value={codigoMotorista}
        onChangeText={setCodigoMotorista}
      />

      <TextInput
        style={styles.input}
        placeholder="Ponto de embarque"
        value={pontoEmbarque}
        onChangeText={setPontoEmbarque}
      />

      <TextInput
        style={styles.input}
        placeholder="Ponto de destino"
        value={pontoDestino}
        onChangeText={setPontoDestino}
      />

      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setUsarAgendamento(!usarAgendamento)}
      >
        <Text style={styles.toggleText}>
          {usarAgendamento ? 'Cancelar agendamento' : 'Agendar para outro horário'}
        </Text>
      </TouchableOpacity>

      {usarAgendamento && (
        <View>
          <TouchableOpacity onPress={() => setMostrarPicker(true)} style={styles.dateButton}>
            <Text style={styles.dateButtonText}>Selecionar Data e Hora</Text>
          </TouchableOpacity>

          {mostrarPicker && (
            <DateTimePicker
              value={dataHora}
              mode="datetime"
              display="default"
              onChange={(event, selectedDate) => {
                setMostrarPicker(false);
                if (selectedDate) {
                  setDataHora(selectedDate);
                }
              }}
            />
          )}

          <Text style={styles.dataSelecionada}>
            Agendado para: {dataHora.toLocaleString()}
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleChamarCorrida}>
        <Text style={styles.buttonText}>Chamar Corrida</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
  },
  toggleButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  toggleText: {
    textAlign: 'center',
    color: '#333',
  },
  dateButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  dateButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  dataSelecionada: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 16,
    color: '#444',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CorridaPersonalizadaScreen;
