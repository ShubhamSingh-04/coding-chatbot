const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const run = require('./ai-model/gemini.cjs');

const chatbotRoute = require('./ai-model/ai-routes/chtabotRoute');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());

const PORT = process.env.EXPRESS_PORT;
const mongoURI = process.env.MONGO_URL;

if(!PORT)
    console.error("EXPRESS_PORT number not found in .env");

if(!mongoURI)
    console.error("MONGO_URL not found in .env");


// chatbot requests
app.use('/api/ai/chatbot', chatbotRoute);



app.listen(PORT, async () => {
    await mongoose.connect(mongoURI)
        .then(() => console.log("MongoDB connected successfully"))
        .catch((err) => console.error("MongoDB connection error:", err));

    console.log("Server running on port", PORT);
});