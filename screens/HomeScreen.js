
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Aba Life</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Corridas')}>
        <Text style={styles.buttonText}>Minhas Corridas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Recompensas')}>
        <Text style={styles.buttonText}>Recompensas</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Convide')}>
        <Text style={styles.buttonText}>Convide Amigos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
