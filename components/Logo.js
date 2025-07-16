import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import logo from '../assets/logo.png'; // Corrigido: import direto da imagem

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} resizeMode="contain" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 100,
  },
});

export default Logo;
