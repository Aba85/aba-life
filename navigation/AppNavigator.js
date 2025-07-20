import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../services/auth/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import CadastroCompletoScreen from '../screens/CadastroCompletoScreen';
import HomeScreen from '../screens/HomeScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { usuario, carregando } = useContext(AuthContext);

  if (carregando) {
    return <LoadingScreen />;
  }

  return (
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
  );
}
