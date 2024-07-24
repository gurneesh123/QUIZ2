const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT || 3000;

// Create a Schema object
const schema = new mongoose.Schema({
  myName: String,
  mySID: String
})

const StudModel = mongoose.model("s24students", schema);        


// This Activitry creates the collection called activitimodels

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/create', async (req, res) => {
  // get the data from the f
  try{
    const myuri = req.body.myuri;
    console.log('MongoDB URI:', myuri);

    // Connect to MongoDB using the provided URI
    await mongoose.connect(myuri, { useNewUrlParser: true, useUnifiedTopology: true });

    // Create a new document using the model
    const student = new StudModel({
      myName: "Gurneesh Anand",
      mySID: "300374667"
    });

    // Save the document to the database
    await student.save();

    // send a response to the user
    res.send(`<h1>Document Added</h1>`);

    // Close the MongoDB connection
    mongoose.disconnect();
    
  }catch(err){
    res.status(400).json({message: err.message})
  }
  
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
