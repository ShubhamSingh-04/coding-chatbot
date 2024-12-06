const express = require('express');
const router = express.Router();

const {createConversation, deleteConversation, getConversation} = require('../db-services/Conversation');

router.post('/createConversation', async (req, res)=>{
    const {userID, conversationName} = req.body;
    const conversationObj = await createConversation(userID, conversationName);
    res.status(200).json(conversationObj);
});

router.post('/createMessage', async(req, res)=>{
    
});


router.get('/getconversation', async(req, res)=>{
    const {userID} = req.query;
    // console.log("bk /getconvo USerID: ", userID);
    try{
        const conversationsInfo = await getConversation(userID);
        // console.log("DbRoutes:", conversationsInfo);
        res.status(200).json({conversationsInfo});
    }
    catch(error){
        console.error("Error at /getConversation backend:", error)
    }
})

module.exports = router;