const mongoose = require('mongoose');
const Conversation = require('../models/conversation.model');

const createConversation = async (userID, conversationName)=>{
    const newConversation = new Conversation({
        userID,
        conversationName
    });

    const newConversationObj = await newConversation.save();
    
    return newConversationObj;
}

const deleteConversation = ()=>{

}

const getConversation = async(userID)=>{
    try{
        // console.log("getconvo USerID: ", userID);

        const conversationsInfo = await Conversation.find({userID:userID})
        .sort({lastUpdatedAt:-1});

        // console.log("getConvo bk Conversation", conversationsInfo);
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