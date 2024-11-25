const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors);
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    try{        
        res.status(200).json({"message":"hello vineet"})
    }
    catch{
        res.status(404).json({"error":"Error occoured"});
    }
});

app.listen(PORT, ()=>{
    console.log("Server running on port", PORT);
});