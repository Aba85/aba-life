// caminho: components/MenuInferior.js

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuInferior = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.menu}>
      <TouchableOpacity onPress={() => navigation.navigate('Saldo')}>
        <Text style={styles.menuItem}>Saldo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Recompensas')}>
        <Text style={styles.menuItem}>Recompensas</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('IAAjuda')}>
        <Text style={styles.menuItem}>Ajuda IA</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Pagamento')}>
        <Text style={styles.menuItem}>Pagamento</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Configuracoes')}>
        <Text style={styles.menuItem}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#0057D9',
    paddingVertical: 10,
  },
  menuItem: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default MenuInferior;
