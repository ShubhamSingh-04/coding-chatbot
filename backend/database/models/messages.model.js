const mongoose = require('mongoose');


const messagesSchema = new mongoose.Schema({
    role:{
        type: String,
        enum:['bot', 'user'],
        required: true
    },

    sentAt:{
        type: Date,
        default: Date.now,
        required: true
    },

    conversationID:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
    },

    content:{
        type: String,
        required: true
    }
});

messagesSchema.index({conversationID:1, sentAt:1});

module.exports = mongoose.model("Message", messagesSchema);