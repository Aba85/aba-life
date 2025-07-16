import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import ChamadaCorridaScreen from '../screens/ChamadaCorridaScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import RecompensasScreen from '../screens/RecompensasScreen';
import ConfiguracoesScreen from '../screens/ConfiguracoesScreen';
import LoginScreen from '../screens/LoginScreen';
import CadastroCompletoScreen from '../screens/CadastroCompletoScreen';
import { useAuth } from '../services/auth/AuthContext';

const Tab = createBottomTabNavigator();

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Início':
            iconName = 'home';
            break;
          case 'Corrida':
            iconName = 'car';
            break;
          case 'Histórico':
            iconName = 'time';
            break;
          case 'Recompensas':
            iconName = 'gift';
            break;
          case 'Configurações':
            iconName = 'settings';
            break;
          default:
            iconName = 'ellipse';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2e7dff',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Início" component={HomeScreen} />
    <Tab.Screen name="Corrida" component={ChamadaCorridaScreen} />
    <Tab.Screen name="Histórico" component={HistoricoScreen} />
    <Tab.Screen name="Recompensas" component={RecompensasScreen} />
    <Tab.Screen name="Configurações" component={ConfiguracoesScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

const AuthStack = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tab.Screen name="Login" component={LoginScreen} />
      <Tab.Screen name="Cadastro" component={CadastroCompletoScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
