const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mern-app')
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log(err)
})

const todoSchema = new mongoose.Schema({
    title : String,
    description : String
});

const todoModel = mongoose.model('Todo',todoSchema);


app.post('/todos',async (req,res)=>{
     const {title,description} = req.body;
    try{
    const newtodo = new todoModel({title,description});
    await newtodo.save();
    res.status(201).json(newtodo);
    }
    catch(error){
        console.log(error);
    }
    
})

app.get('/todos',async(req,res)=>{
    const user = await todoModel.find();
    res.json(user);
})

app.put('/todos/:id',async(req,res)=>{
    const {title,description} = req.body;
    const id = req.params.id;
    try{
        const updated = await todoModel.findByIdAndUpdate(
            id,
            {title,description},
            {new : true}
        );
       res.json(updated);

       if(!updated){
        res.status(404).json("List not Found");
       }
    }catch(err){
        console.log(err);
        res.status(500).json("Server error");
    }
})

app.delete('/todos/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        await todoModel.findByIdAndDelete(id);
        res.status(404).end();
    }catch(err){
        console.log(err);
        res.status(500).json("Server error");
    }
})

app.listen('4000',()=>{
    console.log("server running");
})

/*const express = require('express');
const app = express();
app.use(express.json())
const todos = [];
app.post('/todos',(req,res)=>{
    const {title,description} = req.body;
    const newtodo = {
         id : todos.length+1,
         title,
         description
     }
    todos.push(newtodo);
    res.status(201).json(newtodo);
})

app.get('/todos',(req,res)=>{
    res.status(200).json(todos);
})

app.listen(3000,()=>{
    console.log("started");
})*/

