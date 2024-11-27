const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    sender:{
        conversationId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Conversation', 
            required: true },

        type: String,
        required: true,
        createdAt: date.now`                                                        `
    }
});

module.exports = mongoose.model("Message", messagesSchema);