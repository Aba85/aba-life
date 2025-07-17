import React from 'react';
import { TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

const TextInputWithMask = ({ type, options, value, onChangeText, placeholder, keyboardType }) => {
  return (
    <TextInputMask
      type={type}
      options={options}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={{
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
      }}
    />
  );
};

export default TextInputWithMask;

