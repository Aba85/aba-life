// apps/passageiro/screens/ConfiguracoesScreen.js

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../services/auth/AuthContext';

const ConfiguracoesScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <TouchableOpacity style={styles.botaoLogout} onPress={logout}>
        <Text style={styles.textoBotao}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ConfiguracoesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f4ff', justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#003087', marginBottom: 30, textAlign: 'center' },
  botaoLogout: { backgroundColor: '#d9534f', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
