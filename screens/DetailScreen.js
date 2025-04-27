import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import { getMotherById, deleteMother } from "../db";

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [mother, setMother] = useState(null);

  useEffect(() => {
    getMotherById(id, setMother);
  }, []);

  const handleDelete = () => {
    Alert.alert("Konfirmasi", "Hapus data ibu ini?", [
      { text: "Batal", style: "cancel" },
      {
        text: "Hapus",
        style: "destructive",
        onPress: () => {
          deleteMother(id, () => navigation.navigate("Home"));
        },
      },
    ]);
  };

  if (!mother) return null;

  return (
    <View
      style={{ flex: 1, padding: 16 }}
      accessible
      accessibilityLabel="Detail data ibu"
    >
      <Text variant="headlineSmall">{mother.name}</Text>
      <Text>Usia: {mother.age}</Text>
      <Text>HPL: {mother.hpl}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Add", { id })}
        style={{ marginVertical: 8 }}
        accessibilityRole="button"
        accessibilityLabel="Edit data ibu"
      >
        Edit
      </Button>
      <Button
        mode="outlined"
        onPress={handleDelete}
        accessibilityRole="button"
        accessibilityLabel="Hapus data ibu"
      >
        Hapus
      </Button>
    </View>
  );
}
