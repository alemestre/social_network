const mongoose = require('mongoose')
const { Schema } = mongoose;
const User = require('./User'); 
const Comment = require('./Comment'); 

const postSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
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
    },
    comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})

module.exports = mongoose.model("Post", postSchema)

