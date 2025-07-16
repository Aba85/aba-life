// apps/passageiro/components/FotoUpload.js

import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const FotoUpload = ({ onFotoSelecionada }) => {
  const [imagem, setImagem] = useState(null);

  const solicitarPermissao = async () => {
    const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
    const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus.status !== 'granted' || mediaStatus.status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permita acesso à câmera e galeria para continuar.');
      return false;
    }

    return true;
  };

  const abrirCamera = async () => {
    const permitido = await solicitarPermissao();
    if (!permitido) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.5,
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
      onFotoSelecionada(result.assets[0]);
    }
  };

  const abrirGaleria = async () => {
    const permitido = await solicitarPermissao();
    if (!permitido) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.5,
      allowsEditing: true,
      base64: false,
    });

    if (!result.canceled) {
      setImagem(result.assets[0].uri);
      onFotoSelecionada(result.assets[0]);
    }
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.label}>Foto (selfie ou da galeria)</Text>

      {imagem ? (
        <Image source={{ uri: imagem }} style={estilos.imagem} />
      ) : (
        <View style={estilos.previewVazio}>
          <Ionicons name="person-circle-outline" size={80} color="#bbb" />
        </View>
      )}

      <View style={estilos.botoes}>
        <TouchableOpacity style={estilos.botao} onPress={abrirCamera}>
          <Text style={estilos.botaoTexto}>Tirar Selfie</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilos.botao} onPress={abrirGaleria}>
          <Text style={estilos.botaoTexto}>Escolher da Galeria</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  imagem: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: 'center',
    marginBottom: 12,
  },
  previewVazio: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  botao: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FotoUpload;
