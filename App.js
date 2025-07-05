import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';
import CadastroCompletoScreen from './screens/CadastroCompletoScreen';
import HomeScreen from './screens/HomeScreen';
import CorridaScreen from './screens/CorridaScreen';
import RecompensasScreen from './screens/RecompensasScreen';
import ConfiguracoesScreen from './screens/ConfiguracoesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    const verificarLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      setIsLogged(!!token);
    };
    verificarLogin();
  }, []);

  if (isLogged === null) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLogged ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Corrida" component={CorridaScreen} />
              <Stack.Screen name="Recompensas" component={RecompensasScreen} />
              <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Cadastro" component={CadastroScreen} />
              <Stack.Screen name="CadastroCompleto" component={CadastroCompletoScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}