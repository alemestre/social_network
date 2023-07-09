const mongoose = require('mongoose')
const { Schema } = mongoose;
const User = require('./User'); 

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model("Comment", commentSchema)

