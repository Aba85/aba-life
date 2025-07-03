import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bem-vindo ao Aba Life!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: colors.text,
    textAlign: 'center',
  },
});

export default HomeScreen;