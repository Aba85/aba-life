import React from 'react';
import { TextInput } from 'react-native';
import MaskInput from 'react-native-mask-input';

const TextInputWithMask = ({ value, onChangeText, mask, ...props }) => {
  return (
    <MaskInput
      value={value}
      onChangeText={onChangeText}
      mask={mask}
      {...props}
      style={{
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 6,
        padding: 10,
        marginBottom: 15,
      }}
    />
  );
};

export default TextInputWithMask;
