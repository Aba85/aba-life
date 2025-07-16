import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ChamadaParaTerceiroScreen() {
  const [nome, setNome] = useState('');
  const [foto, setFoto] = useState('');

  const selecionarFoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ base64: true });
    if (!result.canceled) {
      setFoto(result.assets[0].base64);
    }
  };

  const handleConfirmar = () => {
    if (!nome || !foto) {
      return Alert.alert('Preencha todos os campos');
    }
    Alert.alert('Chamada confirmada para terceiro');
    setNome('');
    setFoto('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Chamar para outra pessoa</Text>

      <TextInput
        placeholder="Nome do passageiro"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      <TouchableOpacity style={styles.botao} onPress={selecionarFoto}>
        <Text style={styles.botaoTexto}>Selecionar Foto</Text>
      </TouchableOpacity>

      {foto !== '' && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${foto}` }}
          style={styles.foto}
        />
      )}

      <TouchableOpacity style={styles.botaoFinal} onPress={handleConfirmar}>
        <Text style={styles.botaoTexto}>Confirmar Chamada</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#FFF' },
  titulo: { fontSize: 22, color: '#0066CC', fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#CCC', padding: 12, borderRadius: 8, marginBottom: 12 },
  botao: { backgroundColor: '#0066CC', padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  botaoFinal: { backgroundColor: '#004A99', padding: 14, borderRadius: 10, alignItems: 'center' },
  botaoTexto: { color: '#FFF', fontWeight: 'bold' },
  foto: { width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginTop: 10 },
});
