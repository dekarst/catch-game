const sqlite3 = require('sqlite3').verbose();

// Create or connect to the SQLite database
const db = new sqlite3.Database('./backend/database.sqlite');

// Create the "players" table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL
  )
`);

// Model functions
const playerModel = {
  getAllPlayers: (callback) => {
    db.all('SELECT * FROM players ORDER BY score DESC LIMIT 100', callback);
  },

  addPlayer: (name, score, callback) => {
    const stmt = db.prepare('INSERT INTO players (name, score) VALUES (?, ?)');
    stmt.run(name, score, callback);
    stmt.finalize();
  },
};

module.exports = playerModel;