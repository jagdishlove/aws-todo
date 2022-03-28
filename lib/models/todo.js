const mongoose = require('mogoose');
const todoSchema = new mongoose.Schema({
    title:String
});

module.exports = mongoose.model('Todo', todoSchema);