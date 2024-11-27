const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const run = require('./ai-model/gemini.cjs');

const app = express();
const PORT = 5000;
const mongoURI = "mongodb://localhost:27017/";

app.use(cors());
app.use(bodyParser.json());

app.post('/', async (req, res) => {
    const {sentMessage} = req.body;
    try {
        const response = await run(sentMessage);
        res.status(200).json({ "message": response })
    }
    catch {
        res.status(404).json({ "error": "Error occoured" });
    }
});

app.listen(PORT, async () => {
    await mongoose
        .connect(mongoURI)
        .then(() => console.log("MongoDB connected successfully"))
        .catch((err) => console.error("MongoDB connection error:", err));

    console.log("Server running on port", PORT);
});