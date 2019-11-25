const db = require('./libraries/Database');

db.run(
    'CREATE TABLE IF NOT EXISTS tasks (\n' +
    '    id INTEGER PRIMARY KEY,\n' +
    '    userId INTEGER NOT NULL,\n' +
    '    title TEXT NOT NULL,\n' +
    '    done INTEGER NOT NULL\n' +
    ');'
);
db.serialize(() => {
    db
        .run(`DELETE FROM tasks WHERE 1`)
        .run(`INSERT INTO tasks(title, userId, done) VALUES(?, ?, ?);`,
            ['Task #1', 1, 0]
        )
        .run(`INSERT INTO tasks(title, userId, done) VALUES(?, ?, ?);`,
            ['Task #2', 1, 0]
        )
        .run(`INSERT INTO tasks(title, userId, done) VALUES(?, ?, ?);`,
            ['Task #3', 1, 0]
        )
        .run(`INSERT INTO tasks(title, userId, done) VALUES(?, ?, ?);`,
            ['Task #4', 1, 0]
        )
        .run(`INSERT INTO tasks(title, userId, done) VALUES(?, ?, ?);`,
            ['Task #5', 1, 0]
        );
});
console.log('Database Created and Defaults Inserted');
db.close();