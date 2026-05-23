import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('data.db');
let db;
let SQL; // sql.js module instance

/**
 * Initialize the SQLite database.
 * If a persisted file exists it will be loaded, otherwise a fresh in‑memory
 * database is created and the required tables are set up.
 */
async function initDb() {
  // Load the wasm module (sql.js bundles a .wasm file). The locateFile callback
  // ensures Node can find the binary inside node_modules.
  SQL = await initSqlJs({ locateFile: file => `node_modules/sql.js/dist/${file}` });

  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
    // Create tables if they do not exist
    db.run(`CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      value TEXT
    );`);
    db.run(`CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    );`);
    db.run(`CREATE TABLE IF NOT EXISTS runs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      team_id INTEGER NOT NULL,
      time TEXT NOT NULL,
      date TEXT,
      FOREIGN KEY(team_id) REFERENCES teams(id) ON DELETE CASCADE
    );`);
    // Persist the newly created empty DB file
    persistDb();
  }
}

/** Persist the current in‑memory DB to disk */
function persistDb() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

/** Execute a query and return rows */
function run(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

export { initDb, run, persistDb };
