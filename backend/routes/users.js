const express = require('express');
const router = express.Router();
const db = require('../libraries/Database')

/* GET users tasks listing. */
router.get('/:userId/tasks', function (req, res, next) {
    let sql = `SELECT * FROM tasks WHERE userId=? ORDER BY id DESC`;
    db.all(sql, [req.params.userId], (err, rows) => {
        res.json(rows.map((task) => {
            task.done = !!task.done;
            return task;
        }));
    });
});

router.post('/:userId/tasks', function (req, res, next) {

   let title = req.body.title;
   let sql = `INSERT INTO tasks(title, userId, done) VALUES(?, ?, ?);`;
   db.run(sql,  [title, req.params.userId, 0],  function(err) {
       if (err) throw err;
       res.json({
           id: this.lastID,
           title: title,
           userId: 1,
           done: false
       })
   });
});

router.put('/:userId/tasks/:taskId', function (req, res, next) {

    let taskId = req.params.taskId;
    let userId = req.params.userId;
    let done = req.body.done ? 1 : 0;
    let sql = `UPDATE tasks SET done=? where userId=? AND id=?`;
    db.run(sql, [done, userId, taskId], function (err) {
        if (err) throw err;
        sql = `SELECT * FROM tasks where id=? LIMIT 0,1`;
        db.all(sql, [taskId], function (err2, rows) {
            if (err2) throw err2;
            if (rows.length) {
                res.json(rows[0]);
            }
        })
    });
});

module.exports = router;
