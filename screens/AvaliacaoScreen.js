import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function AvaliacaoScreen() {
  const [nota, setNota] = useState('');
  const [comentario, setComentario] = useState('');

  const handleEnviar = () => {
    if (!nota) return Alert.alert('Informe uma nota');
    Alert.alert('Obrigado pela avaliação!');
    setNota('');
    setComentario('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Avalie sua corrida</Text>
      <TextInput
        placeholder="Nota (0 a 5)"
        keyboardType="numeric"
        value={nota}
        onChangeText={setNota}
        style={styles.input}
      />
      <TextInput
        placeholder="Comentário (opcional)"
        value={comentario}
        onChangeText={setComentario}
        style={styles.input}
      />
      <TouchableOpacity style={styles.botao} onPress={handleEnviar}>
        <Text style={styles.botaoTexto}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#FFF' },
  titulo: { fontSize: 22, color: '#0066CC', fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#CCC', padding: 12, borderRadius: 8, marginBottom: 12 },
  botao: { backgroundColor: '#0066CC', padding: 14, borderRadius: 10, alignItems: 'center' },
  botaoTexto: { color: '#FFF', fontWeight: 'bold' },
});
