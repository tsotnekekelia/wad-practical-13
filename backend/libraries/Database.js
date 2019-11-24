const sqlite3 = require('sqlite3').verbose();

module.exports = {

    db: new sqlite3.Database('./db/todo.db', sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
    }),
    init: () => {
        this.db.run(
            'CREATE TABLE tasks (\n' +
            '    id INTEGER PRIMARY KEY,\n' +
            '    userId INTEGER NOT NULL,\n' +
            '    title TEXT NOT NULL,\n' +
            '    done INTEGER NOT NULL,\n' +
            ');'
        );

        this.db.close();
    },

    insertTask: (title, userId) => {
        this.db.run(`INSERT INTO tasks(title,userId,done) VALUES(?,?,?);`, [title, userId, 0]);
        this.db.close();
    },

    getTasks: (userId) => {
        let sql = `SELECT * FROM tasks WHERE userId=? ORDER BY id DESC`;
        let result = [];
        this.db.all(sql, [userId], (err, rows) => {
            result = rows;
        });

        this.db.close();

        return result;
    }

};