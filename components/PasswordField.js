import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordField = ({ value, onChangeText, placeholder }) => {
  const [secureText, setSecureText] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secureText}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        textContentType="password"
      />
      <TouchableOpacity onPress={() => setSecureText(!secureText)} style={styles.icon}>
        <Ionicons name={secureText ? 'eye-off' : 'eye'} size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
  },
  icon: {
    padding: 10,
  },
});

export default PasswordField;