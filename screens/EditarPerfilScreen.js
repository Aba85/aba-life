import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EditarPerfilScreen = () => {
  const [nomeExibicao, setNomeExibicao] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const carregarNomeSalvo = async () => {
      const nomeSalvo = await AsyncStorage.getItem('nome_exibicao');
      if (nomeSalvo) {
        setNomeExibicao(nomeSalvo);
      }
    };
    carregarNomeSalvo();
  }, []);

  const salvarAlteracoes = async () => {
    if (!nomeExibicao.trim()) {
      Alert.alert('Erro', 'O nome de exibição não pode estar vazio.');
      return;
    }

    try {
      await AsyncStorage.setItem('nome_exibicao', nomeExibicao.trim());
      Alert.alert('Sucesso', 'Nome de exibição atualizado com sucesso.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar as alterações.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Perfil</Text>

      <Text style={styles.label}>Nome de exibição:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome pelo qual deseja ser chamado"
        value={nomeExibicao}
        onChangeText={setNomeExibicao}
      />

      <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
        <Text style={styles.textoBotao}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 24,
    fontSize: 16,
  },
  botaoSalvar: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EditarPerfilScreen;
