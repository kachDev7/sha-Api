const mongoose = require('mongoose');

// Post Schema
const postSchema = mongoose.Schema({
    title: String,
    body1: String,
    body2: String,
    preview: String,
    image1: String,
    image2: String,
    author: String,
    date: {
        type: Date,
        default: Date.now
    },
    category: String
})

// export the postSchema as Post
module.exports = mongoose.model('Post', postSchema)