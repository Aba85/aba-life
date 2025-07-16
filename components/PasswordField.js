import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PasswordField({ placeholder, value, onChangeText }) {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureText}
      />
      <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.button}>
        <Text style={styles.buttonText}>{secureText ? '👁️' : '🙈'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    paddingRight: 10,
  },
  input: {
    flex: 1,
    padding: 12,
  },
  button: {
    padding: 4,
  },
  buttonText: {
    fontSize: 18,
  },
});
