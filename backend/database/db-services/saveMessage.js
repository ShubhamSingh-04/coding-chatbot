const Message = require('../models/messages.model');

const saveMessage = async(role, conversationID, content)=>{
    const newMessage = new Message({
        role,
        conversationID,
        content
    });

    await newMessage.save();
}

module.exports = saveMessage;