import express from 'express';
import { Database } from 'sql.js';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(express.json());

// Load or create SQLite database in memory (or file)
const dbFile = path.resolve('data.db');
let db;
if (fs.existsSync(dbFile)) {
  const fileBuffer = fs.readFileSync(dbFile);
  db = new Database(fileBuffer);
} else {
  db = new Database();
}

// Simple helper to run queries
function runQuery(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

// Example CRUD routes for a generic "items" table
app.get('/items', (req, res) => {
  const rows = runQuery('SELECT * FROM items');
  res.json(rows);
});

app.post('/items', (req, res) => {
  const { name, value } = req.body;
  runQuery('INSERT INTO items (name, value) VALUES (?, ?)', [name, value]);
  res.status(201).json({ message: 'Created' });
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;
  runQuery('UPDATE items SET name = ?, value = ? WHERE id = ?', [name, value, id]);
  res.json({ message: 'Updated' });
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  runQuery('DELETE FROM items WHERE id = ?', [id]);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
