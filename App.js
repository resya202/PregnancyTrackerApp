// App.js
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider }    from "react-native-paper";
import { NavigationContainer }           from "@react-navigation/native";
import { createStackNavigator }          from "@react-navigation/stack";

import AuthScreen   from "./screens/AuthScreen";
import HomeScreen   from "./screens/HomeScreen";
import DetailScreen from "./screens/DetailScreen";
import AddScreen    from "./screens/AddScreen";
import MapScreen    from "./screens/MapScreen";
import { initializeDatabase } from "./db";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    initializeDatabase();
  }, []);

  // before sign-in, show AuthScreen
  if (!user) return <AuthScreen onSignIn={setUser} />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Home"   component={HomeScreen}   options={{ title: "Data Ibu Hamil" }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Detail Ibu"      }} />
            <Stack.Screen name="Add"    component={AddScreen}    options={{ title: "Tambah/Edit Ibu" }} />
            <Stack.Screen name="Map"    component={MapScreen}    options={{ title: "Peta Lokasi"     }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
