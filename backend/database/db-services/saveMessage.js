const mongoose  = require('mongoose');
const Message = require('../models/messages.model');

const saveMessage = async(role, conversationID, content)=>{
    const conversationID_ObjID = new mongoose.Types.ObjectId(conversationID)
    const newMessage = new Message({
        role:role,
        conversationID:conversationID_ObjID,
        content
    });

    await newMessage.save();
}

module.exports = saveMessage;