import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from "./components/Screen1"
import Screen2 from "./components/Screen2"
import Screen3 from "./components/Screen3"

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="s1"
          component={Screen1}
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="s2"
          component={Screen2}
          options={{
            title: 'admin page',
            headerStyle: {
              backgroundColor: '#ff0000',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="s3"
          component={Screen3}
          options={{
            title: 'details page',
            headerStyle: {
              backgroundColor: '#ff0000',
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