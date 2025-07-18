import React from 'react';
import { StyleSheet } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';

const TextInputWithMask = ({
  mask,
  value,
  onChangeText,
  placeholder,
  keyboardType,
}) => {
  return (
    <MaskedTextInput
      mask={mask}
      value={value}
      onChangeText={(text, rawText) => {
        onChangeText(text); // ou use rawText se quiser sem máscara
      }}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={styles.input}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
});

export default TextInputWithMask;