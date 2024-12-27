const mongoose = require('mongoose');


const messagesSchema = new mongoose.Schema({
    role:{
        type: String,
        enum:['bot', 'user', 'attachment'],
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

    content: {
        type: String
    },

    attachment:{
        type:{
            attachmentType: {
                type:String,
                enum:['github', 'file'],
                required:true
            },

            attachmentName:{
                type:String,
                required:true
            },

            attachmentContent:{
                type:[mongoose.Schema.Types.Mixed],
                required:true
            }
        }
    }
});

messagesSchema.index({conversationID:1, sentAt:1});

module.exports = mongoose.model("Message", messagesSchema);