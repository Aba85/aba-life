import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordField = ({ value, onChangeText, placeholder, style, ...props }) => {
  const [secure, setSecure] = useState(true);

  return (
    <View style={[{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#ccc' }, style]}>
      <TextInput
        style={{ flex: 1, padding: 10 }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secure}
        {...props}
      />
      <TouchableOpacity onPress={() => setSecure(!secure)} style={{ paddingHorizontal: 10 }}>
        <Ionicons name={secure ? 'eye-off' : 'eye'} size={20} color="#888" />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordField;


