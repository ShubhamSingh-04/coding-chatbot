const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({

    userID:{
        type:mongoose.Types.ObjectId,
        required: true
    },

    conversationName:{
        type:String,
        required:true,
    },

    createdAt:{
        type:Date,
        default: Date.now,
        required: true
    },

    lastUpdatedAt:{
        type:Date,
        default: Date.now,
        required: true
    }
});

conversationSchema.index({userID:1, lastUpdatedAt:-1});

module.exports = mongoose.model("Conversation", conversationSchema);