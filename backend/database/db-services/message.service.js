const mongoose = require('mongoose');
const Message = require('../models/messages.model');

const saveMessage = async (role, conversationID, content) => {
    const conversationID_ObjID = new mongoose.Types.ObjectId(conversationID);
    const newMessage = new Message({
        role: role,
        conversationID: conversationID_ObjID,
        content
    });

    await newMessage.save();
}

const fetchMessages = async (conversationID) => {
    const conversationID_ObjID = new mongoose.Types.ObjectId(conversationID);

    try {
        const messages = await Message.find({
            conversationID: conversationID_ObjID
        })
        .select('role sentAt content')
        .sort({ sentAt: 1 });

        return messages;
    } catch (error) {
        console.error("Error At fetchMessages():", error);
    }
}

module.exports = {fetchMessages, saveMessage};