
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import CorridasPendentesScreen from '../screens/CorridasPendentesScreen';
import CorridaEmAndamentoScreen from '../screens/CorridaEmAndamentoScreen';
import CarteiraScreen from '../screens/CarteiraScreen';
import AvaliacaoScreen from '../screens/AvaliacaoScreen';
import SuporteScreen from '../screens/SuporteScreen';

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="CorridasPendentes" component={CorridasPendentesScreen} />
      <Stack.Screen name="CorridaEmAndamento" component={CorridaEmAndamentoScreen} />
      <Stack.Screen name="Carteira" component={CarteiraScreen} />
      <Stack.Screen name="Avaliacao" component={AvaliacaoScreen} />
      <Stack.Screen name="Suporte" component={SuporteScreen} />
    </Stack.Navigator>
  );
}
