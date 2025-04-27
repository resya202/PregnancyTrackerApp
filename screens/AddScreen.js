import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { addMother, updateMother, getMotherById } from "../db";

export default function AddScreen({ route, navigation }) {
  const editId = route.params?.id;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [hpl, setHpl] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (editId)
      getMotherById(editId, (m) => {
        setName(m.name);
        setAge(String(m.age));
        setHpl(m.gestational_age);
        setNotes(m.notes);
      });
  }, [editId]);

  const handleSave = () => {
    const data = { name, age: parseInt(age, 10), gestational_age: hpl, notes };
    const callback = () => navigation.navigate("Home");
    if (editId) updateMother(editId, data, callback);
    else addMother(data, callback);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 16 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TextInput
        label="Nama Ibu"
        value={name}
        onChangeText={setName}
        accessibilityLabel="Input nama ibu"
      />
      <TextInput
        label="Usia"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        accessibilityLabel="Input usia ibu"
        style={{ marginTop: 8 }}
      />
      <TextInput
        label="HPL"
        value={hpl}
        onChangeText={setHpl}
        accessibilityLabel="Input HPL"
        style={{ marginTop: 8 }}
      />
      <TextInput
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        accessibilityLabel="Input Notes"
        style={{ marginTop: 8 }}
      />
      <Button
        mode="contained"
        onPress={handleSave}
        style={{ marginTop: 16 }}
        accessibilityRole="button"
        accessibilityLabel="Simpan data ibu"
      >
        Simpan
      </Button>
    </KeyboardAvoidingView>
  );
}
