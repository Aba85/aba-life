// caminho: navigation/AppNavigator.js

import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthContext } from '../services/auth/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import CadastroCompletoScreen from '../screens/CadastroCompletoScreen';
import HomeScreen from '../screens/HomeScreen';
import SaldoScreen from '../screens/SaldoScreen';
import RecompensasScreen from '../screens/RecompensasScreen';
import PagamentoScreen from '../screens/PagamentoScreen';
import IAAjudaScreen from '../screens/IAAjudaScreen';
import BloqueioScreen from '../screens/BloqueioScreen';
import ConfiguracoesScreen from '../screens/ConfiguracoesScreen';
import ChamadaCorridaScreen from '../screens/ChamadaCorridaScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { usuario, carregando } = useContext(AuthContext);
  const [bloqueado, setBloqueado] = useState(false);
  const [verificandoBloqueio, setVerificandoBloqueio] = useState(true);

  useEffect(() => {
    const verificar = async () => {
      if (usuario) {
        try {
          const response = await fetch(`https://backend-abalife.onrender.com/usuarios/bloqueio`, {
            headers: {
              Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
            },
          });
          const data = await response.json();
          setBloqueado(data.bloqueado);
        } catch (error) {
          console.error('Erro ao verificar bloqueio:', error);
        }
      }
      setVerificandoBloqueio(false);
    };

    verificar();
  }, [usuario]);

  if (carregando || verificandoBloqueio) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!usuario ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Cadastro" component={CadastroCompletoScreen} />
          </>
        ) : bloqueado ? (
          <Stack.Screen name="Bloqueio" component={BloqueioScreen} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ChamadaCorrida" component={ChamadaCorridaScreen} />
            <Stack.Screen name="Saldo" component={SaldoScreen} />
            <Stack.Screen name="Recompensas" component={RecompensasScreen} />
            <Stack.Screen name="Pagamento" component={PagamentoScreen} />
            <Stack.Screen name="IAAjuda" component={IAAjudaScreen} />
            <Stack.Screen name="Configuracoes" component={ConfiguracoesScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
