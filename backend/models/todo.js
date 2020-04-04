const mongoose = require('mongoose');

let todoSchema = mongoose.Schema({
    todo_description: { type: String},
    todo_responsible: { type: String},
    todo_priority: { type: String},
    todo_completed: { type: Boolean}
});
const Todo = mongoose.model("Todo",todoSchema);
module.exports = Todo;