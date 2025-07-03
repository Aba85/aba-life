import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomButton, Logo } from '../components';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants';

const WelcomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.title}>Bem-vindo ao Aba Life</Text>
      <CustomButton
        title="Entrar"
        onPress={() => navigation.navigate('Login')}
      />
      <CustomButton
        title="Criar Conta"
        onPress={() => navigation.navigate('Register')}
        backgroundColor={colors.secondary}
        textColor="#000"
      />
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default WelcomeScreen;