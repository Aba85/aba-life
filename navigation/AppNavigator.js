// apps/passageiro/navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import CadastroCompletoScreen from '../screens/CadastroCompletoScreen';
import HomeScreen from '../screens/HomeScreen';
import { useAuth } from '../services/auth/AuthContext';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { usuario, carregando } = useAuth();

  if (carregando) {
    return null; // ou um SplashScreen se quiser
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {usuario ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CadastroCompleto" component={CadastroCompletoScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
} 