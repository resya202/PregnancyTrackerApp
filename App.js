// App.js
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import AddScreen from "./screens/AddScreen";
import { initializeDatabase } from "./db";

const Stack = createStackNavigator();

export default function App() {
  React.useEffect(() => {
    initializeDatabase();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Data Ibu Hamil" }}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen}
            options={{ title: "Detail Ibu" }}
          />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            options={{ title: "Tambah Ibu" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
