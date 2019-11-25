const express = require('express');
const router = express.Router();
const db = require('../libraries/Database')

/* GET users tasks listing. */
router.get('/1/tasks', function (req, res, next) {
    let sql = `SELECT * FROM tasks WHERE userId=? ORDER BY id DESC`;
    db.all(sql, [1], (err, rows) => {
        res.json(rows.map((task) => {
            task.done = task.done > 0;
            return task;
        }));
    });
});

router.post('/1/tasks', function (req, res, next) {

   let title = req.body.title;
   let sql = `INSERT INTO tasks(title, userId, done) VALUES(?, ?, ?);`;
   db.run(sql,  ['Task #1', 1, 0],  function(err) {
       if (err) throw err;
       res.json({
           id: this.lastID,
           title: title,
           userId: 1,
           done: false
       })
   });
});

module.exports = router;
