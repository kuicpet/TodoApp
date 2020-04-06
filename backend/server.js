const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRouter = require('../backend/routes/routes');
const PORT = 4000;

const app = express();

mongoose.connect("mongodb+srv://todo:aMQdEa2obIvmuUok@cluster0-x8poy.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser:true},)
.then(()=>{
    console.log("Successfully connected to Mongodb Atlas");
}).catch((error)=>{
    console.log("Unable to connect to Mongodb Atlas");
    console.log(error);
});

app.use(express.json()); //Make sure it comes back as json
app.use(cors()); //Handling CORS errors
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));

app.use(todoRouter);

app.listen(PORT,() => {
    console.log("Server is Running on Port "+ PORT);
});