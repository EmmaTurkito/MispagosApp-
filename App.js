import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import PagosScreen from './screens/PagosScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Ingresar' }} />
        <Stack.Screen name="Pagos" component={PagosScreen} options={{ title: 'Mis Pagos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
