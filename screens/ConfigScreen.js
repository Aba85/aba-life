import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../services/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ConfigScreen = () => {
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  const confirmarLogout = () => {
    Alert.alert(
      'Sair do App',
      'Tem certeza de que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => logout() },
      ],
      { cancelable: true }
    );
  };

  const handlePrivacidade = () => {
    navigation.navigate('Privacidade');
  };

  const handleAjuda = () => {
    navigation.navigate('AjudaSuporte');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <TouchableOpacity style={styles.botao} onPress={handlePrivacidade}>
        <Text style={styles.textoBotao}>Privacidade</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={handleAjuda}>
        <Text style={styles.textoBotao}>Ajuda e Suporte</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSair} onPress={confirmarLogout}>
        <Text style={styles.textoBotao}>Sair do App</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  botaoSair: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 8,
    marginTop: 40,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ConfigScreen;
