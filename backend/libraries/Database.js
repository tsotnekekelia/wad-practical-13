const sqlite3 = require('sqlite3').verbose();

module.exports = new sqlite3.Database('./db/todo.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
})