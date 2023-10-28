import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Main from "./components/Main";
import List from './components/List';
import Map from './components/Map';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="s1"
          component={Main}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="s2"
          component={List}
          options={{
            title: 'Zapis pozycji',
            headerStyle: {
              backgroundColor: '#7B1FA2',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="s3"
          component={Map}
          options={{
            title: 'Lokalizacja mapy',
            headerStyle: {
              backgroundColor: '#7B1FA2',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;