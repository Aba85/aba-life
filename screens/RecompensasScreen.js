import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getRecompensas } from '../services/recompensas/recompensaService';
import { AuthContext } from '../services/auth/AuthContext';

const RecompensasScreen = () => {
  const { token } = useContext(AuthContext);
  const [recompensa, setRecompensa] = useState(null);

  useEffect(() => {
    const carregarRecompensas = async () => {
      try {
        const data = await getRecompensas(token);
        setRecompensa(data);
      } catch (error) {
        console.log('Erro ao carregar recompensas:', error);
      }
    };

    carregarRecompensas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Recompensas</Text>
      {recompensa ? (
        <Text style={styles.valor}>R$ {recompensa.total?.toFixed(2) || '0,00'}</Text>
      ) : (
        <Text style={styles.valor}>R$ 0,00</Text>
      )}
    </View>
  );
};

export default RecompensasScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4ff' },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#003087', marginBottom: 10 },
  valor: { fontSize: 28, fontWeight: 'bold', color: '#28a745' },
});
