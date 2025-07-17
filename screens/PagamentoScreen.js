// caminho: screens/PagamentoScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import MenuInferior from '../components/MenuInferior';

const PagamentoScreen = () => {
  const [cartao, setCartao] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('pix');

  const salvarPagamento = () => {
    Alert.alert('Forma de pagamento salva', `Usando ${formaPagamento}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Formas de Pagamento</Text>

      <Text style={styles.label}>Número do Cartão</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={cartao}
        onChangeText={setCartao}
        placeholder="0000 0000 0000 0000"
      />

      <Text style={styles.label}>Escolha a forma de pagamento</Text>
      <View style={styles.opcoes}>
        <TouchableOpacity
          style={[
            styles.opcao,
            formaPagamento === 'pix' && styles.opcaoSelecionada,
          ]}
          onPress={() => setFormaPagamento('pix')}
        >
          <Text style={styles.opcaoTexto}>PIX</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.opcao,
            formaPagamento === 'cartao' && styles.opcaoSelecionada,
          ]}
          onPress={() => setFormaPagamento('cartao')}
        >
          <Text style={styles.opcaoTexto}>Cartão</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botao} onPress={salvarPagamento}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>

      <MenuInferior />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F9FF',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0057D9',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  opcoes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  opcao: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ccc',
  },
  opcaoSelecionada: {
    backgroundColor: '#0057D9',
  },
  opcaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#0057D9',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PagamentoScreen;
