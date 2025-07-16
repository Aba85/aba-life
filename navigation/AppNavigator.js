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

const AppTab = createBottomTabNavigator();
const AuthTab = createBottomTabNavigator();

const AppTabs = () => (
  <AppTab.Navigator
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
    <AppTab.Screen name="Início" component={HomeScreen} />
    <AppTab.Screen name="Corrida" component={ChamadaCorridaScreen} />
    <AppTab.Screen name="Histórico" component={HistoricoScreen} />
    <AppTab.Screen name="Recompensas" component={RecompensasScreen} />
    <AppTab.Screen name="Configurações" component={ConfiguracoesScreen} />
  </AppTab.Navigator>
);

const AuthStack = () => {
  return (
    <AuthTab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <AuthTab.Screen name="Login" component={LoginScreen} />
      <AuthTab.Screen name="CadastroCompleto" component={CadastroCompletoScreen} />
    </AuthTab.Navigator>
  );
};

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator; 