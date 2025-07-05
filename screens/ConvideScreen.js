
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';

export default function ConvideScreen() {
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Cadastre-se no Aba Life com meu código de indicação e ganhe recompensas!',
      });
    } catch (error) {
      alert('Erro ao compartilhar: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Convide seus amigos</Text>
      <Text style={styles.text}>
        Compartilhe seu código de indicação e ganhe bônus a cada corrida realizada por seus indicados!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleShare}>
        <Text style={styles.buttonText}>Compartilhar Código</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 14,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
