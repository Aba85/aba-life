
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RecompensasScreen = () => {
  const elegivel = true;
  const valorPorCorrida = 0.5;
  const corridasUltimos30Dias = 4;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área de Recompensas</Text>
      <Text style={styles.text}>Status: {elegivel ? 'Elegível' : 'Não elegível'}</Text>
      <Text style={styles.text}>
        Corridas nos últimos 30 dias: {corridasUltimos30Dias}
      </Text>
      <Text style={styles.text}>
        Valor recebido por corrida dos indicados: R$ {valorPorCorrida.toFixed(2)}
      </Text>
      <Text style={styles.note}>
        Para manter a elegibilidade, você precisa ter nota mínima de 4.7 e ao menos uma corrida nos últimos 30 dias.
      </Text>
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
  },
  note: {
    fontSize: 14,
    marginTop: 20,
    color: '#555',
  },
});

export default RecompensasScreen;
