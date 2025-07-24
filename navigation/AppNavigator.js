// apps/passageiro/navigation/AppNavigator.js

import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import CadastroCompletoScreen from '../screens/CadastroCompletoScreen';
import HomeScreen from '../screens/HomeScreen';
import ChamadaCorridaScreen from '../screens/ChamadaCorridaScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import RecompensasScreen from '../screens/RecompensasScreen';
import ConfiguracoesScreen from '../screens/ConfiguracoesScreen';
import { AuthContext } from '../services/auth/AuthContext';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { usuario, carregando } = useContext(AuthContext);

  if (carregando) return null;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {usuario ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ChamadaCorrida" component={ChamadaCorridaScreen} />
          <Stack.Screen name="Historico" component={HistoricoScreen} />
          <Stack.Screen name="Recompensas" component={RecompensasScreen} />
          <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Cadastro" component={CadastroCompletoScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
