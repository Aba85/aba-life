
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';

const CorridaEmAndamentoScreen = ({ navigation }) => {
  const [distancia, setDistancia] = useState(5);
  const [tempo, setTempo] = useState(10);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCarregando(false);
    }, 1500);
  }, []);

  const finalizarCorrida = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Corrida em Andamento</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.text}>Motorista a caminho...</Text>
          <Text style={styles.text}>Distância estimada: {distancia} km</Text>
          <Text style={styles.text}>Tempo estimado: {tempo} minutos</Text>
          <Button title="Finalizar Corrida" onPress={finalizarCorrida} />
        </>
      )}
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
  text: {
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default CorridaEmAndamentoScreen;
