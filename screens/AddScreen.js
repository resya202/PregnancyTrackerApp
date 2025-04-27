import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { addMother, updateMother, getMotherById } from "../db";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#3A9BDC",
    borderRadius: 8,
  },
});

export default function AddScreen({ route, navigation }) {
  const editId = route.params?.id;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gestationalAge, setGestationalAge] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editId)
      getMotherById(editId, (m) => {
        setName(m.name);
        setAge(String(m.age));
        setGestationalAge(m.gestational_age);
        setNotes(m.notes);
      });
  }, [editId]);

  const handleSave = () => {
    const data = { name, age: parseInt(age, 10), gestational_age, notes };
    const callback = () => navigation.navigate("Home");
    if (editId) updateMother(editId, data, callback);
    else addMother(data, callback);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TextInput
        label="Nama Ibu"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
        placeholder="Masukkan nama ibu"
      />
      <TextInput
        label="Usia"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        style={styles.input}
        mode="outlined"
        placeholder="Masukkan usia ibu"
      />
      <TextInput
        label="Usia Kandungan"
        value={gestationalAge}
        onChangeText={setGestationalAge}
        style={styles.input}
        mode="outlined"
        placeholder="Masukkan Usia Kandungan"
      />
      <TextInput
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        style={styles.input}
        mode="outlined"
        placeholder="Masukkan catatan"
      />
      <Button mode="contained" onPress={handleSave} style={styles.button}>
        Simpan
      </Button>
    </KeyboardAvoidingView>
  );
}
