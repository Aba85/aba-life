
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const VisualizarFotoPassageiroScreen = ({ route }) => {
  const { fotoUri, nomePassageiro } = route.params || {
    fotoUri: 'https://via.placeholder.com/200',
    nomePassageiro: 'Passageiro Exemplo',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Foto do Passageiro</Text>
      <Image source={{ uri: fotoUri }} style={styles.image} />
      <Text style={styles.name}>{nomePassageiro}</Text>
      <Text style={styles.alert}>
        ⚠️ Captura de tela desabilitada por segurança e privacidade.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    marginBottom: 12,
  },
  alert: {
    fontSize: 14,
    color: '#c00',
    textAlign: 'center',
  },
});

export default VisualizarFotoPassageiroScreen;
