const sqlite3 = require("sqlite3");

const db = new sqlite3.Database(
  "./forum.database",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error("Could not connect to server", err.message);
    } else {
      console.log("Connected to database");
    }
  }
);

module.exports = db;
