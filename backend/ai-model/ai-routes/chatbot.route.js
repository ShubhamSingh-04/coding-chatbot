const express = require('express');
const router = express.Router();

const {saveMessage} = require('../../database/db-services/message.service');
const {push_conversation_history, set_empty} = require('../ai-services/conversation-history.cjs');

const run = require('../ai-services/gemini.cjs');

router.post('/', async (req, res)=>{
    const {conversationID, sentMessage} = req.body;
    const saved_message = await saveMessage('user', conversationID, sentMessage);
    await push_conversation_history(saved_message); //save message to model conversation history
    
    try{
        const response  = await run(sentMessage);
        res.status(200).json({"message": response});
        const saved_message  = await saveMessage('bot', conversationID, response);
        await push_conversation_history(saved_message);
    } catch(error){
        console.error("Error at .post chatbot.route.js:", error);
    }    
})

module.exports = router;