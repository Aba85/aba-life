// caminho: screens/SaldoScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { buscarSaldo } from '../services/user/userService';
import MenuInferior from '../components/MenuInferior';

const SaldoScreen = () => {
  const [saldo, setSaldo] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarSaldo = async () => {
      const valor = await buscarSaldo();
      setSaldo(valor);
      setCarregando(false);
    };
    carregarSaldo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Saldo</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#0057D9" />
      ) : (
        <Text style={styles.saldo}>R$ {saldo?.toFixed(2)}</Text>
      )}
      <MenuInferior />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F9FF',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0057D9',
    textAlign: 'center',
  },
  saldo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#0057D9',
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default SaldoScreen;
