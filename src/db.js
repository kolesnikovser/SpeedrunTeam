import { Database } from 'sql.js';
import fs from 'fs';
import path from 'path';

const dbPath = path.resolve('data.db');
let db;

function initDb() {
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new Database(fileBuffer);
  } else {
    db = new Database();
    // create a sample table
    db.run(`CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      value TEXT
    );`);
    // persist empty DB file
    persistDb();
  }
}

function persistDb() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(dbPath, buffer);
}

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
