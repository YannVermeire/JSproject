const sqlite3 = require('sqlite3').verbose();
const http = require("http");

let db = new sqlite3.Database('./database/users.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the chinook database.');
  });
