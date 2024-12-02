const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    passwordHash:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default: Date.now
    }
});

userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);