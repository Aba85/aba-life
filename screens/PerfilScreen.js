import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../services/auth/AuthContext';

export default function PerfilScreen() {
  const { usuario } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Seu Perfil</Text>

      {usuario?.foto && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${usuario.foto}` }}
          style={styles.foto}
        />
      )}

      <Text style={styles.info}>Nome: {usuario?.nome}</Text>
      <Text style={styles.info}>E-mail: {usuario?.email}</Text>
      <Text style={styles.info}>CPF: {usuario?.cpf}</Text>
      <Text style={styles.info}>Telefone: {usuario?.telefone}</Text>
      <Text style={styles.info}>Endereço: {usuario?.rua}, {usuario?.bairro}, {usuario?.cidade}-{usuario?.estado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#FFF',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  foto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
});
