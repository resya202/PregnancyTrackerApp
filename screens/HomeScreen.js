import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { List, FAB } from "react-native-paper";
import { getAllMothers } from "../db";

export default function HomeScreen({ navigation }) {
  const [mothers, setMothers] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllMothers(setMothers);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{ flex: 1 }}
      accessible
      accessibilityLabel="Daftar Ibu Hamil"
      accessibilityHint="Menampilkan daftar ibu hamil"
    >
      <FlatList
        data={mothers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`Usia: ${item.age}, HPL: ${
              item.gestational_age
            }, notes: ${item.notes == null ? "-" : item.notes}`}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
            accessibilityRole="button"
            accessibilityLabel={`Ibu ${item.name}`}
          />
        )}
      />
      <FAB
        icon="plus"
        style={{ position: "absolute", right: 16, bottom: 16 }}
        onPress={() => navigation.navigate("Add")}
        accessibilityRole="button"
        accessibilityLabel="Tambah data ibu"
      />
    </View>
  );
}
