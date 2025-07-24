// apps/passageiro/components/PasswordField.js

import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordField = ({ label, value, onChangeText }) => {
  const [visivel, setVisivel] = useState(false);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.campoSenha}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visivel}
          placeholder="Digite a senha"
        />
        <TouchableOpacity onPress={() => setVisivel(!visivel)}>
          <Ionicons
            name={visivel ? 'eye-off' : 'eye'}
            size={22}
            color="#003087"
            style={styles.icone}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  container: { marginBottom: 15 },
  label: { marginBottom: 5, color: '#003087', fontWeight: 'bold' },
  campoSenha: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: { flex: 1, padding: 12, fontSize: 16 },
  icone: { marginLeft: 8 },
});
