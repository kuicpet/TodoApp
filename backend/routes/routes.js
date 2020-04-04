const express = require('express');
const todoModel = require('../models/todo');

const app = express();

//Get All Todos
app.get('/todos',async(req,res,next) => {
const todos = await todoModel.find({});
try {
    res.status(200).send(todos);
} catch (error) {
    res.status(500).send(error);
};
next();
});

//Post a new Todo
app.post('/todos/add',async(req,res,next) => {
    const todo = new todoModel({
        todo_description : req.body.todo_description,
        todo_responsible : req.body.todo_responsible,
        todo_priority : req.body.todo_priority,
        todo_completed : req.body.todo_completed
    });
    try {
        await todo.save();
        res.status(201).send(todo);
        console.log("Todo added Successfully!");
    } catch (error) {
        res.status(500).send(error);
        console.log("Unable to add a new Todo");
    };
    next();
});

//Get id of a Todo
app.get('/todos/:id',async(req,res,next) => {
    const todo = await todoModel.findById({
        _id : req.params.id
    });
    try {
        res.status(200).send(todo);
    } catch (error) {
        res.status(500).send(error);
    };
    next();
});

//Update a Todo
app.put('/todos/update/:id',async(req,res,next) => {
    try {
        await todoModel.findByIdAndUpdate(req.params.id,req.body);
        await todoModel.save();
        res.status(200).send(todo);
        console.log("Todo Updated Successfully!");
    } catch (error) {
        res.status(500).send(error);
    };
    next();
});

//Delete a Todo
app.delete('/todos/:id',async(req,res,next) => {
    try {
        const todo = await todoModel.findByIdAndDelete(req.params.id,req.body);
        if(!todo) res.status(404).send("No Item Found");
        res.status(200).send("Todo successfully deleted!");
        console.log("Todo deleted successfully!");
    } catch (error) {
        res.status(500).send(error);
    };
    next();
});

module.exports = app;