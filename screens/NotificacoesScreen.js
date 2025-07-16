import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificacoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Notificações</Text>
      <Text style={styles.mensagem}>Nenhuma notificação no momento.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0066CC',
  },
  mensagem: {
    fontSize: 16,
    color: '#333',
  },
});
