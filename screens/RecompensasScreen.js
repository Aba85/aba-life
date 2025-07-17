// caminho: screens/RecompensasScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { buscarRecompensas, buscarCodigoIndicacao } from '../services/user/userService';
import MenuInferior from '../components/MenuInferior';

const RecompensasScreen = () => {
  const [recompensas, setRecompensas] = useState([]);
  const [codigo, setCodigo] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      const lista = await buscarRecompensas();
      const codigoInd = await buscarCodigoIndicacao();
      setRecompensas(lista || []);
      setCodigo(codigoInd || '');
      setCarregando(false);
    };
    carregarDados();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Recompensas</Text>
      {carregando ? (
        <ActivityIndicator size="large" color="#0057D9" />
      ) : (
        <>
          <Text style={styles.codigo}>Seu código de indicação: <Text style={styles.bold}>{codigo}</Text></Text>
          <FlatList
            data={recompensas}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.recompensa}>
                <Text style={styles.texto}>
                  {item.descricao} - R$ {item.valor.toFixed(2)}
                </Text>
              </View>
            )}
          />
        </>
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
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0057D9',
    marginBottom: 20,
    textAlign: 'center',
  },
  codigo: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  recompensa: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 1,
  },
  texto: {
    fontSize: 15,
  },
});

export default RecompensasScreen;
