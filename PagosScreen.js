import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Switch, Button, ActivityIndicator, StyleSheet } from 'react-native';

const SHEET_API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec';

export default function PagosScreen({ route, navigation }) {
  const { email } = route.params;
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(SHEET_API_URL)
      .then(res => res.json())
      .then(data => {
        const userPagos = data.filter(p => p.Email === email);
        setPagos(userPagos);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const updateEstado = (item, newEstado) => {
    fetch(SHEET_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email, Fecha: item.Fecha, Estado: newEstado })
    });
    setPagos(pagos.map(p => p.Fecha===item.Fecha ? { ...p, Estado: newEstado } : p));
  };

  if (loading) return <ActivityIndicator style={{ flex:1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={pagos}
        keyExtractor={item => item.Fecha}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex:1 }}>
              <Text>{item.Fecha}</Text>
              <Text>${item.Monto}</Text>
            </View>
            <Switch
              value={item.Estado === 'Pagado'}
              onValueChange={v => updateEstado(item, v ? 'Pagado' : 'Pendiente')}
            />
          </View>
        )}
      />
      <Button title="Cerrar sesión" onPress={() => navigation.replace('Login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16 },
  item: { flexDirection:'row', alignItems:'center', paddingVertical:8, borderBottomWidth:1, borderColor:'#eee' }
});
