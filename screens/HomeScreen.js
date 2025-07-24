// apps/passageiro/screens/HomeScreen.js

import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../services/auth/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { usuario } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, {usuario?.nome || 'Passageiro'}!</Text>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('ChamadaCorrida')}>
        <Text style={styles.textoBotao}>Chamar Corrida</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Historico')}>
        <Text style={styles.textoBotao}>Histórico de Corridas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Recompensas')}>
        <Text style={styles.textoBotao}>Minhas Recompensas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Configuracoes')}>
        <Text style={styles.textoBotao}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#f0f4ff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#003087' },
  botao: { backgroundColor: '#003087', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  textoBotao: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
