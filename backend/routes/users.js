const express = require('express');
const router = express.Router();
const fs = require('fs');

/* GET users tasks listing. */
router.get('/1/tasks', function (req, res, next) {

    fs.readFile('./data/tasks.json', (err, data) => {
        if (err) throw err;
        let tasks = JSON.parse(data);
        res.json(tasks);
    });

});

router.post('/1/tasks', function (req, res, next) {

   let title = req.body.title;
    fs.readFile('./data/tasks.json', (err, data) => {
        if (err) throw err;
        let tasks = JSON.parse(data);

        let item = {
            id: tasks.length + 1,
            title: title,
            done: false
        };
        tasks.push(item);

        fs.writeFile('./data/tasks.json', JSON.stringify(tasks), (err) => {
            if (err) throw err;
            res.json(item);
        })
    });
});

module.exports = router;
