const express = require('express');
const router = express.Router();

const {createConversation, deleteConversation, getConversation} = require('../db-services/conversation.service');
const { fetchMessages } = require('../db-services/message.service');
const {push_conversation_history, set_conversation_history_empty} = require('../../ai-model/ai-services/conversation-history.cjs');

router.post('/createConversation', async (req, res)=>{
    const {userID, conversationName} = req.body;
    const conversationObj = await createConversation(userID, conversationName);
    await set_conversation_history_empty();
    res.status(200).json(conversationObj);
});

router.post('/deleteConversationAndUpdate', async(req, res)=>{
    const {userID, conversationID} = req.body;

    try{
        await deleteConversation(userID, conversationID);
    } catch(error){
        console.error("Error at /deleteConversationAndUpdate:", error);
    }

    try{
        const conversationsInfo = await getConversation(userID);
        res.status(200).json({conversationsInfo});
    } catch(error){
        console.error("Error at /deleteConversationAndUpdate fetching updated conversation info:", error);
    }

    await set_conversation_history_empty();
});


router.get('/getconversation', async(req, res)=>{
    const {userID} = req.query;
    try{
        const conversationsInfo = await getConversation(userID);
        res.status(200).json({conversationsInfo});
    }
    catch(error){
        console.error("Error at /getConversation backend:", error)
    }
});


router.get('/fetchMessages', async(req, res)=>{
    const {userID, conversationID} = req.query;

    try{
        const messages = await fetchMessages(conversationID);

        await set_conversation_history_empty();
        messages.forEach(async(item)=>{     // set conversation history for ai model
            await push_conversation_history(item);
        })

        res.status(200).json({messages});

    } catch(error){
        console.error("Error at /fetchMessages:", error);
    }
})

module.exports = router;