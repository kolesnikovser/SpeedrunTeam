import express from 'express';
// Database import removed (handled in db.js)
import path from 'path';
import fs from 'fs';
import { initDb, run, persistDb } from './db.js';

const app = express();
app.use(express.json());

// Initialize DB
initDb();

// Simple helper to run queries (already exported from db.js)
function runQuery(sql, params = []) {
  return run(sql, params);
}

// Existing items CRUD routes (example)
app.get('/items', (req, res) => {
  const rows = runQuery('SELECT * FROM items');
  res.json(rows);
});

app.post('/items', (req, res) => {
  const { name, value } = req.body;
  runQuery('INSERT INTO items (name, value) VALUES (?, ?)', [name, value]);
  persistDb();
  res.status(201).json({ message: 'Created' });
});

app.put('/items/:id', (req, res) => {
  const { id } = req.params;
  const { name, value } = req.body;
  runQuery('UPDATE items SET name = ?, value = ? WHERE id = ?', [name, value, id]);
  persistDb();
  res.json({ message: 'Updated' });
});

app.delete('/items/:id', (req, res) => {
  const { id } = req.params;
  runQuery('DELETE FROM items WHERE id = ?', [id]);
  persistDb();
  res.json({ message: 'Deleted' });
});

// New Teams routes
app.get('/teams', (req, res) => {
  const rows = runQuery('SELECT * FROM teams');
  res.json(rows);
});

app.post('/teams', (req, res) => {
  const { name } = req.body;
  runQuery('INSERT INTO teams (name) VALUES (?)', [name]);
  persistDb();
  res.status(201).json({ message: 'Team created' });
});

app.put('/teams/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  runQuery('UPDATE teams SET name = ? WHERE id = ?', [name, id]);
  persistDb();
  res.json({ message: 'Team updated' });
});

app.delete('/teams/:id', (req, res) => {
  const { id } = req.params;
  runQuery('DELETE FROM teams WHERE id = ?', [id]);
  persistDb();
  res.json({ message: 'Team deleted' });
});

// New Runs (speedrun) routes
app.get('/runs', (req, res) => {
  const rows = runQuery('SELECT r.id, t.name as team, r.time, r.date FROM runs r JOIN teams t ON r.team_id = t.id');
  res.json(rows);
});

app.post('/runs', (req, res) => {
  const { team_id, time, date } = req.body;
  runQuery('INSERT INTO runs (team_id, time, date) VALUES (?, ?, ?)', [team_id, time, date]);
  persistDb();
  res.status(201).json({ message: 'Run recorded' });
});

app.put('/runs/:id', (req, res) => {
  const { id } = req.params;
  const { team_id, time, date } = req.body;
  runQuery('UPDATE runs SET team_id = ?, time = ?, date = ? WHERE id = ?', [team_id, time, date, id]);
  persistDb();
  res.json({ message: 'Run updated' });
});

app.delete('/runs/:id', (req, res) => {
  const { id } = req.params;
  runQuery('DELETE FROM runs WHERE id = ?', [id]);
  persistDb();
  res.json({ message: 'Run deleted' });
});

// Serve static frontend files (checking dist folder for built production bundle first)
const frontendPath = fs.existsSync(path.resolve('frontend/dist'))
  ? path.resolve('frontend/dist')
  : path.resolve('frontend');

app.use(express.static(frontendPath));

// Fallback for single page application routing (React Router)
app.get('*', (req, res) => {
  const indexPath = path.join(frontendPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Фронтенд не собран. Пожалуйста, соберите его командой "npm run build" в папке frontend.');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
