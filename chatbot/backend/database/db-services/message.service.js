const mongoose = require('mongoose');
const Message = require('../models/messages.model');
const { setLastUpdatedAtToNow } = require('./conversation.helper');

const saveMessage = async (role, conversationID, content) => {
    const conversationID_ObjID = new mongoose.Types.ObjectId(conversationID);
    const newMessage = new Message({
        role: role,
        conversationID: conversationID_ObjID,
        content
    });

    const saved_message = await newMessage.save();
    await setLastUpdatedAtToNow(conversationID);

    return saved_message;
}

const saveAttachment = async(conversationID, attachment) =>{
    const conversationID_ObjID = new mongoose.Types.ObjectId(conversationID);

    try{
        const newMessage = new Message({
            role: 'attachment',
            conversationID: conversationID_ObjID,
            attachment
        });
    
        const savedAttachment = await newMessage.save();
        await setLastUpdatedAtToNow(conversationID);
    
        return savedAttachment;
    } catch(error){
        console.error("Error at saveAttachment db/message.service.js")
    }
}

const fetchMessages = async (conversationID) => {
    const conversationID_ObjID = new mongoose.Types.ObjectId(conversationID);

    try {
        const messages = await Message.find({
            conversationID: conversationID_ObjID
        })
        .select('role sentAt content attachment')
        .sort({ sentAt: 1 });

        return messages;
    } catch (error) {
        console.error("Error At fetchMessages():", error);
    }
}

const deleteMessagesWithConversationID = async(conversationID)=>{
    const conversationID_ObjID = new mongoose.Types.ObjectId(conversationID);

    try{
        await Message.deleteMany({conversationID:conversationID_ObjID});
    } catch(error){
        console.error("Error at deleteMessagesWithConversationID() message.service.js:", error);
    }
}

module.exports = {fetchMessages, saveMessage, deleteMessagesWithConversationID, saveAttachment};