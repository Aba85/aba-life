// caminho: screens/HomeScreen.js

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MenuInferior from '../components/MenuInferior';
import { AuthContext } from '../services/auth/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { usuario } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.boasVindas}>Olá, {usuario?.nome || 'Passageiro'}!</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('ChamadaCorrida')}
      >
        <Text style={styles.botaoTexto}>Chamar Corrida</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('Saldo')}
      >
        <Text style={styles.botaoTexto}>Ver Saldo</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('Recompensas')}
      >
        <Text style={styles.botaoTexto}>Minhas Recompensas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('Pagamento')}
      >
        <Text style={styles.botaoTexto}>Forma de Pagamento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('IAAjuda')}
      >
        <Text style={styles.botaoTexto}>Ajuda com IA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSecundario}
        onPress={() => navigation.navigate('Configuracoes')}
      >
        <Text style={styles.botaoTexto}>Configurações</Text>
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
  boasVindas: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0057D9',
    textAlign: 'center',
    marginBottom: 30,
  },
  botao: {
    backgroundColor: '#0057D9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 15,
  },
  botaoSecundario: {
    backgroundColor: '#3388FF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default HomeScreen;
