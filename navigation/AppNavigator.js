// AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from '../services/auth/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import CadastroCompletoScreen from '../screens/CadastroCompletoScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

function MainNavigator() {
  const { userToken, loading } = useAuth();

  if (loading) {
    return null; // ou uma tela de splash/loading
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userToken ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CadastroCompleto" component={CadastroCompletoScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
