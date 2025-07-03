
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const PerfilScreen = () => {
  const [nome, setNome] = useState('Fulano da Silva');
  const [email, setEmail] = useState('fulano@email.com');
  const [telefone, setTelefone] = useState('11999999999');

  const salvarPerfil = () => {
    // Lógica para salvar dados do perfil
    console.log('Perfil atualizado:', { nome, email, telefone });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seu Perfil</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome completo"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={telefone}
        onChangeText={setTelefone}
        placeholder="Telefone"
        keyboardType="phone-pad"
      />
      <Button title="Salvar Alterações" onPress={salvarPerfil} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default PerfilScreen;
