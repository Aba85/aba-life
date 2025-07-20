import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../services/auth/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const { usuario, logout } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.saudacao}>Olá, {usuario?.nome || 'Passageiro'}!</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('ChamadaCorrida')}
      >
        <Text style={styles.textoBotao}>Chamar Corrida</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Historico')}
      >
        <Text style={styles.textoBotao}>Histórico de Corridas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Recompensas')}
      >
        <Text style={styles.textoBotao}>Minhas Recompensas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('Configuracoes')}
      >
        <Text style={styles.textoBotao}>Configurações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSair}
        onPress={logout}
      >
        <Text style={styles.textoBotao}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF5FF',
    padding: 20,
    justifyContent: 'center',
  },
  saudacao: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#1E3A8A',
  },
  botao: {
    backgroundColor: '#1E3A8A',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  botaoSair: {
    backgroundColor: '#D32F2F',
    padding: 15,
    borderRadius: 12,
    marginTop: 30,
  },
  textoBotao: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
