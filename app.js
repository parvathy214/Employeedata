// Task1: initiate app and run server at 3000
const express = require("express");
const  Cors = require("cors");
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const logger = require('morgan');
const employeeModel = require("./model/Employee");
const app = express();


app.use(Cors());
const path=require('path');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));

// Task2: create mongoDB connection 

Mongoose.connect("mongodb+srv://p4parvathy214:Lekhaatlas@cluster0.ndcrk8y.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true})

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
  .then(() => 
  console.log('Connected to the database'))
  .catch(err =>
  console.error('Error connecting to the database', err));



//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist',async(req,res)=>{
    try{
        var data = await employeeModel.find();
        res.send(data);
        // res.status(200).json({status:"Data fetched",data})
        
    }
    catch(error){
        console.log(error);
        res.status(400).json('Error!!Data not fetched');
    }

})



//TODO: get single data from db  using api '/api/employeelist/:id'

app.get('/api/employeelist/:id',async(req,res)=>{
    try{
    const id = req.params.id;
    var data = await employeeModel.findById(id);
    // res.status(200).json({status:"Data fetched",data})
    res.send(data);
    }
    catch(error){
        console.log(error);
        res.status(400).json('Error!!Data not fetched');
    }

})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async(req,res)=>{
    try{
    var data = new employeeModel(req.body);
    await data.save();
    res.send("Data added ");
    }
    catch(error){
        console.log(error);
        res.status(400).json('Error!!Data not added');
    }
})



//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        var deleteData = await employeeModel.findByIdAndDelete(id);
        res.send("Data Deleted");
        }
        catch(error){
            console.log(error)
            res.status(400).json('Error!! data not deleted')
        }
   
})




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {
    try {
      const dataToUpdate = req.body;
      const query = dataToUpdate._id ? { _id: dataToUpdate._id } : { name: dataToUpdate.name };
      const updateData = await employeeModel.findOneAndUpdate(query,{ $set: dataToUpdate });
          res.send("Data Updated");
    } 
    catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Error updating data' });
    }
  });
  

//! dont delete this code. it connects the front end file.

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

app.listen(3000,(req,res)=>{
    console.log("server listening at 3000");
})

