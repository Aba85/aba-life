import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HistoricoScreen from '../screens/HistoricoScreen';
import RecompensasScreen from '../screens/RecompensasScreen';
import ConfiguracoesScreen from '../screens/ConfiguracoesScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#2e7dff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { paddingBottom: 4, height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Início':
              iconName = 'home-outline';
              break;
            case 'Histórico':
              iconName = 'time-outline';
              break;
            case 'Recompensas':
              iconName = 'gift-outline';
              break;
            case 'Configurações':
              iconName = 'settings-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Início" component={HomeScreen} />
      <Tab.Screen name="Histórico" component={HistoricoScreen} />
      <Tab.Screen name="Recompensas" component={RecompensasScreen} />
      <Tab.Screen name="Configurações" component={ConfiguracoesScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
