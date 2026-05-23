import { initDb, run, persistDb } from './db.js';
import fs from 'fs';
import path from 'path';

describe('Database Tests', () => {
  beforeAll(async () => {
    // Initialize in-memory database
    await initDb();
  });

  test('Should insert and select items', () => {
    // Insert test item
    run('INSERT INTO items (name, value) VALUES (?, ?)', ['TestItem', 'TestValue']);
    
    // Select test item
    const rows = run('SELECT * FROM items WHERE name = ?', ['TestItem']);
    
    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe('TestItem');
    expect(rows[0].value).toBe('TestValue');
  });

  test('Should insert and select teams', () => {
    // Insert test team
    run('INSERT INTO teams (name) VALUES (?)', ['Speedrunners X']);
    
    // Select test team
    const rows = run('SELECT * FROM teams WHERE name = ?', ['Speedrunners X']);
    
    expect(rows.length).toBe(1);
    expect(rows[0].name).toBe('Speedrunners X');
  });

  test('Should insert and select runs linked to teams', () => {
    // Get team id
    const teamRows = run('SELECT id FROM teams WHERE name = ?', ['Speedrunners X']);
    const teamId = teamRows[0].id;

    // Insert test run
    run('INSERT INTO runs (team_id, time, date) VALUES (?, ?, ?)', [teamId, '00:45:12.34', '2026-05-23']);
    
    // Select test run with team name
    const rows = run('SELECT r.id, t.name as team, r.time, r.date FROM runs r JOIN teams t ON r.team_id = t.id WHERE r.team_id = ?', [teamId]);
    
    expect(rows.length).toBe(1);
    expect(rows[0].team).toBe('Speedrunners X');
    expect(rows[0].time).toBe('00:45:12.34');
  });
});
