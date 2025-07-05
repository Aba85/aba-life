
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecompensasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas Recompensas</Text>
      <Text style={styles.text}>
        Aqui você verá quanto está acumulando por corridas dos seus indicados.
      </Text>
      <View style={styles.box}>
        <Text style={styles.amount}>R$ 42,50</Text>
        <Text style={styles.label}>Total acumulado</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.amount}>R$ 0,50</Text>
        <Text style={styles.label}>Por corrida de indicado</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  box: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  amount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
});
