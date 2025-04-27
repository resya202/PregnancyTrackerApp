import React, { useState, useEffect } from "react";
import { View, Alert, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";
import { getMotherById, deleteMother } from "../db";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
  },
  button: {
    marginVertical: 8,
  },
});

export default function DetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [mother, setMother] = useState(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: "#ffffff",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#1260CC",
    },
    text: {
      fontSize: 16,
      marginBottom: 6,
      color: "#333",
    },
    button: {
      marginVertical: 8,
      borderRadius: 8,
    },
    buttonEdit: {
      marginVertical: 8,
      borderRadius: 8,
      backgroundColor: "#3A9BDC",
    },
  });

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
    <View style={styles.container}>
      <Text style={styles.title}>{mother.name}</Text>
      <Text style={styles.text}>Usia: {mother.age}</Text>
      <Text style={styles.text}>Usia Kandungan: {mother.gestational_age}</Text>
      <Text style={styles.text}>Notes: {mother.notes || "-"}</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Add", { id: mother.id })}
        style={styles.buttonEdit}
      >
        Edit
      </Button>
      <Button
        mode="outlined"
        onPress={handleDelete}
        style={styles.button}
        textColor="#e53935"
      >
        Hapus
      </Button>
    </View>
  );
}
