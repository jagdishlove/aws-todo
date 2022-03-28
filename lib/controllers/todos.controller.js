const express = require('express')
const router = express.Router()
const Todo = require('../models/todo')

router.get('/', async (req, res) => {
    const todos = await Todo.find().select('title').sort({ "_id": -1 });
    res.set("Access-control-Allow-Origin", "*");
    res.json(todos);
})

router.post('/', async (req, res) => {
    if (!req.body) {
        return res.status(403).end();
    }
    const todo = await Todo.create(req.body)
    res.set("Access-Control-Allow-Origin", "*");
    res.json(todo);
});


router.put('/:id', async (req, res) => {
    if (!req.body) {
        return res.status(403).end();
    }
    const todo = await Todo.findByAndUpdate(req.params.id, {
        $set: req.body
    }, {
        $upsert: true,
        new: true
    })
    res.set("Access-Control-Allow-Origin", "*");
    res.json(todo);
});


router.delete('/:id', async (req, res) => {
    const todo = await Todo.deleteOne({
        _id: req.params.id
    })
    res.set("Access-Control-Allow-Origin", "*");
    res.json(todo);
});

module.exports = router;