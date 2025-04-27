import React, { useState, useEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { List, FAB } from "react-native-paper";
import { getAllMothers } from "../db";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  listItem: {
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    elevation: 2,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#29C5F6",
  },
});

export default function HomeScreen({ navigation }) {
  const [mothers, setMothers] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getAllMothers(setMothers);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={mothers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={`Usia: ${item.age}, Usia Kandungan (Minggu): ${
              item.gestational_age
            }, notes: ${item.notes || "-"}`}
            onPress={() => navigation.navigate("Detail", { id: item.id })}
            style={styles.listItem}
          />
        )}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("Add")}
      />
    </View>
  );
}
