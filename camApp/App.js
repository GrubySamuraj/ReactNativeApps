import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Start } from "./components/Start";
import { Gallery } from "./components/Gallery";
import { MyCamera } from "./components/MyCamera";
import { BigPhoto } from "./components/BigPhoto";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="s1"
          component={Start}
          options={{
            headerShown: false,
            title: "",
          }}
        />
        <Stack.Screen
          name="s2"
          component={Gallery}
          options={{
            title: "Zdjęcia z folderu DCIM",
            headerStyle: {
              backgroundColor: "#F57C00",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="camera"
          component={MyCamera}
          options={{
            title: "Kamera",
            headerStyle: {
              backgroundColor: "#F57C00",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="bigPhoto"
          component={BigPhoto}
          options={{
            title: "Wybrane zdjęcie",
            headerStyle: {
              backgroundColor: "#F57C00",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
