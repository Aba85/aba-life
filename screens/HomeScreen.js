import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../services/auth/AuthContext';

export default function HomeScreen() {
  const { user } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo, {user?.nome || 'passageiro'}!</Text>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>Chamar Corrida</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    color: '#0066CC',
  },
  botao: {
    backgroundColor: '#0066CC',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
