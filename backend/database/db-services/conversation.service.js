const mongoose = require('mongoose');

const Conversation = require('../models/conversation.model');

const createConversation = async (userID, conversationName)=>{
    const userID_ObjID = new mongoose.Types.ObjectId(userID);
    const newConversation = new Conversation({
        userID:userID_ObjID,
        conversationName:conversationName
    });

    const newConversationObj = await newConversation.save();
    
    return newConversationObj;
}

const deleteConversation = async(userID, conversationID)=>{
    const userID_ObjID = new mongoose.Types.ObjectId(userID);
    try{
        await Conversation.findOneAndDelete({userID:userID_ObjID, _id:conversationID});
    } catch(error){
        console.error("Error at deleteConversation():", error);
    }
}

const getConversation = async(userID)=>{
    try{
        const userID_ObjID = new mongoose.Types.ObjectId(userID);

        const conversationsInfo = await Conversation.find({userID:userID_ObjID})
        .sort({lastUpdatedAt:-1});

        return conversationsInfo;
    }
    catch(error){
        console.error("Error at getConversation function backend:", error);
        return [];
    }
}

module.exports = {
    createConversation,
    deleteConversation,
    getConversation
}