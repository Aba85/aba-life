// apps/passageiro/components/TextInputWithMask.js

import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const TextInputWithMask = ({ type, options, value, onChangeText, placeholder }) => {
  return (
    <TextInputMask
      type={type}
      options={options}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={styles.input}
      keyboardType="numeric"
    />
  );
};

export default TextInputWithMask;

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
});
