// db.js

import * as SQLite from "expo-sqlite";

// Membuka atau membuat database secara sinkron
const db = SQLite.openDatabaseSync("pregnancy_tracker.db");

/// Inisialisasi database: membuat tabel jika belum ada
export function initializeDatabase() {
  try {
    db.execSync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS mothers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          age INTEGER NOT NULL,
          gestational_age INTEGER NOT NULL,
          notes TEXT
        );
      `);
    console.log("Tabel mothers berhasil dibuat atau sudah ada.");
  } catch (error) {
    console.error("Gagal menginisialisasi database:", error);
  }
}

// Menambahkan data ibu hamil baru
export function addMother({ name, age, gestational_age, notes }, callback) {
  console.log("name ", name);
  console.log("age ", age);
  console.log("gestational_age ", gestational_age);
  if (!name || !age || !gestational_age) {
    alert("Mohon isi semua bidang yang wajib diisi.");
    return;
  }
  const stmt = db.prepareSync(
    "INSERT INTO mothers (name, age, gestational_age, notes) VALUES (?, ?, ?, ?);"
  );
  try {
    const result = stmt.executeSync([name, age, gestational_age, notes]);
    return result.lastInsertRowId;
  } finally {
    stmt.finalizeSync();
    alert("berhasil");
    callback();
  }
}

// Mengambil semua data ibu hamil
export function getAllMothers(setMothers) {
  const stmt = db.prepareSync("SELECT * FROM mothers ORDER BY id DESC;");
  try {
    const result = stmt.executeSync();
    setMothers(result.getAllSync());
  } finally {
    stmt.finalizeSync();
  }
}

// Mengambil data ibu hamil berdasarkan ID
export function getMotherById(id, setMother) {
  const stmt = db.prepareSync("SELECT * FROM mothers WHERE id = ?;");
  try {
    const result = stmt.executeSync([id]);
    setMother(result.getFirstSync());
  } finally {
    stmt.finalizeSync();
  }
}

// Memperbarui data ibu hamil
export function updateMother(
  editId,
  { name, age, gestational_age, notes },
  callback
) {
  console.log("name ", name);
  console.log("age ", age);
  console.log("gestational_age ", gestational_age);
  console.log("notes", notes);
  if (!name || !age || !gestational_age) {
    alert("Mohon isi semua bidang yang wajib diisi.");
    return;
  }
  const stmt = db.prepareSync(
    "UPDATE mothers SET name = ?, age = ?, gestational_age = ?, notes = ? WHERE id = ?;"
  );
  try {
    const result = stmt.executeSync([
      name,
      age,
      gestational_age,
      notes,
      editId,
    ]);
    console.log(result.changes);
    return result.changes;
  } finally {
    stmt.finalizeSync();
    alert("berhasil");
    callback();
  }
}

// Menghapus data ibu hamil berdasarkan ID
export function deleteMother(id, callback) {
  const stmt = db.prepareSync("DELETE FROM mothers WHERE id = ?;");
  try {
    const result = stmt.executeSync([id]);
    return result.changes;
  } finally {
    stmt.finalizeSync();
    callback();
  }
}
