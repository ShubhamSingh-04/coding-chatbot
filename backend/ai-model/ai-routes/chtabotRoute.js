const express = require('express');
const router = express.Router();

const saveMessage = require('../../database/db-services/saveMessage')

const run = require('../ai-services/gemini.cjs');

router.post('/', async (req, res)=>{
    const {sentMessage} = req.body;
    saveMessage('user', 'conid', sentMessage);
    
    try{
        const response  = await run(sentMessage);
        res.status(200).json({"message": response});
        saveMessage('bot', 'conid', response);
    } catch(error){
        console.error("Error at .get chatbotRoute:", error);
    }

    
})

module.exports = router;