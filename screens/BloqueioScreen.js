// caminho: screens/BloqueioScreen.js

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BloqueioScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Acesso Bloqueado</Text>
      <Text style={styles.mensagem}>
        Seu acesso está temporariamente suspenso por descumprimento das regras da plataforma.
      </Text>
      <Text style={styles.info}>
        Verifique seu e-mail ou entre em contato com o suporte para mais informações.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff0f0',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cc0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  mensagem: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  info: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
  },
});

export default BloqueioScreen;
