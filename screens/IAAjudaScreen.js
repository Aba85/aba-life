// caminho: screens/IAAjudaScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MenuInferior from '../components/MenuInferior';

const IAAjudaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ajuda com Inteligência Artificial</Text>
      <ScrollView style={styles.conteudo}>
        <Text style={styles.texto}>
          Aqui você pode tirar dúvidas e receber orientações automáticas sobre:
        </Text>
        <Text style={styles.item}>• Segurança nas corridas</Text>
        <Text style={styles.item}>• Como evitar bloqueios</Text>
        <Text style={styles.item}>• Regras de comportamento</Text>
        <Text style={styles.item}>• Recompensas e saldo</Text>
        <Text style={styles.item}>• Uso correto da plataforma</Text>
        <Text style={styles.item}>• Como indicar amigos e ganhar mais</Text>
        <Text style={styles.item}>• Como cadastrar seu cartão de forma segura</Text>

        <Text style={styles.textoFinal}>
          A IA da Aba Life está em constante aprendizado para melhorar sua experiência.
        </Text>
      </ScrollView>
      <MenuInferior />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F9FF',
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0057D9',
    marginBottom: 20,
    textAlign: 'center',
  },
  conteudo: {
    flex: 1,
  },
  texto: {
    fontSize: 16,
    marginBottom: 15,
  },
  item: {
    fontSize: 16,
    marginBottom: 8,
    paddingLeft: 10,
  },
  textoFinal: {
    marginTop: 20,
    fontSize: 15,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default IAAjudaScreen;
