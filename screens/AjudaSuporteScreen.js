import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';

const AjudaSuporteScreen = () => {
  const abrirEmail = () => {
    const email = 'abalife@abalifeappcombr.com';
    const assunto = 'Ajuda com o aplicativo Aba Life';
    const body = 'Olá, preciso de ajuda com o app.';

    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      assunto
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o aplicativo de e-mail.');
    });
  };

  const abrirWhatsApp = () => {
    const numero = '5571992640064';
    const mensagem = 'Olá, preciso de ajuda com o aplicativo Aba Life.';
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ajuda e Suporte</Text>
      <Text style={styles.texto}>
        Se você tiver dúvidas, problemas ou sugestões, entre em contato com nosso suporte.
      </Text>

      <TouchableOpacity style={styles.botao} onPress={abrirEmail}>
        <Text style={styles.textoBotao}>Enviar e-mail</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={abrirWhatsApp}>
        <Text style={styles.textoBotao}>Falar pelo WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  texto: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    color: '#444',
  },
  botao: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
  },
  textoBotao: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AjudaSuporteScreen;
