import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import Ionicons from '@expo/vector-icons/Ionicons';

const IndicarPassageiroScreen = () => {
  const { user } = useAuth();
  const codigo = user?.codigoIndicacao || 'ABC123';

  const copiarCodigo = () => {
    Clipboard.setString(codigo);
    Alert.alert('Copiado!', 'Código de indicação copiado para a área de transferência.');
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Indique e Ganhe</Text>

      <Text style={estilos.texto}>
        Compartilhe seu código de indicação abaixo com amigos. Você receberá recompensas por cada
        corrida finalizada por eles, se estiver elegível.
      </Text>

      <View style={estilos.codigoBox}>
        <Text style={estilos.codigo}>{codigo}</Text>
        <TouchableOpacity onPress={copiarCodigo}>
          <Ionicons name="copy" size={24} color="#007bff" />
        </TouchableOpacity>
      </View>

      <Text style={estilos.detalhe}>
        Para estar elegível, você precisa manter uma nota mínima de 4.70 e ter feito pelo menos uma
        corrida nos últimos 30 dias.
      </Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  texto: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
  },
  codigoBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eef1f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 24,
  },
  codigo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 12,
  },
  detalhe: {
    fontSize: 13,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});

export default IndicarPassageiroScreen; 
