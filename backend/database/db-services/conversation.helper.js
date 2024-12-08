const mongoose = require('mongoose');
const Conversation = require('../models/conversation.model');

// to remove the circular depedency between message.service & conversation.service

const setLastUpdatedAtToNow = async(conversationID)=>{
    const conversationID_ObjID = new mongoose.Types.ObjectId(conversationID);

    try{
        await Conversation.findByIdAndUpdate(conversationID_ObjID, {$set:{ lastUpdatedAt:Date.now() }})
    } catch(error){
        console.error("Error at setLastUpdatedAtToNow() conversation.helper:", error);
    }
}

module.exports = {
    setLastUpdatedAtToNow
}