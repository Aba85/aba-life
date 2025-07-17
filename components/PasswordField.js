import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordField = ({ value, onChangeText, placeholder }) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, marginVertical: 10 }}>
      <TextInput
        style={{ flex: 1, padding: 10 }}
        placeholder={placeholder}
        secureTextEntry={secureText}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={() => setSecureText(!secureText)}>
        <Ionicons name={secureText ? 'eye-off' : 'eye'} size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordField;
