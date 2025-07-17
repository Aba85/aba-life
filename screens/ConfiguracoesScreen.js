// caminho: screens/ConfiguracoesScreen.js

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../services/auth/AuthContext';
import MenuInferior from '../components/MenuInferior';

const ConfiguracoesScreen = ({ navigation }) => {
  const { signOut } = useContext(AuthContext);

  const confirmarLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair do aplicativo?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Sair', onPress: () => signOut() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <TouchableOpacity style={styles.botao} onPress={confirmarLogout}>
        <Text style={styles.botaoTexto}>Sair do Aplicativo</Text>
      </TouchableOpacity>

      <MenuInferior />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0057D9',
    textAlign: 'center',
    marginBottom: 40,
  },
  botao: {
    backgroundColor: '#cc0000',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConfiguracoesScreen;
