import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordField = ({ value, onChangeText, placeholder }) => {
  const [secureText, setSecureText] = useState(true);

  const toggleSecureText = () => {
    setSecureText(!secureText);
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginVertical: 5 }}>
      <TextInput
        style={{ flex: 1, height: 50 }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureText}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={toggleSecureText}>
        <Ionicons name={secureText ? 'eye-off' : 'eye'} size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordField; 