const mongoose = require('mongoose')
const { Schema } = mongoose;
const Post = require('./Post'); 

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    firstName: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    lastName: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }
  ]
})

module.exports = mongoose.model("User", userSchema)

