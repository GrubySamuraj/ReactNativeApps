import { StyleSheet, StatusBar } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Start } from './components/Start';
import { Main } from './components/Main';
import { AddScreen } from './components/addScreen';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="s1"
          component={Start}
          options={{
            headerShown: false
          }} />
        <Stack.Screen name="s2" component={Main}
          options={{
            title: 'Lista budzików',
            headerStyle: {
              backgroundColor: '#5D4037',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} />
        <Stack.Screen name="alarms" component={AddScreen}
          options={{
            title: 'Dodaj budzik',
            headerStyle: {
              backgroundColor: '#5D4037',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            }
          }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
