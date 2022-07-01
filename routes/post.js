const express = require('express');
const Post = require('../models/Post');

// const multer = require('multer');
// const cloudinary = require('./cloudinary')
// const fs = require('fs')

// Init Router
const router = express.Router();

// Shannels get request from DB. Schema : Post
router.get('/', async (req, res) => {
    try{
        const gotPosts = await Post.find();
        // console.log(gotPosts)
        res.json(gotPosts);
    } catch (err) {
        return({ message: err})
    }
})

// req for a post with postId
router.get('/:postId', async (req, res) => {
    try{
        const gotPost = await Post.findOne({_id : req.params.postId})
        res.json(gotPost);
    } catch (err) {
        return({ message: err})
    }
})

// Shannels Post Request
router.post('/', async (req, res) => {
    // set vlalues from req Post Schema
    const post = new Post({
        title: req.body.title,
        body1: req.body.body1,
        body2: req.body.body2,
        preview: req.body.preview,
        image1: req.body.image_one,
        image2: req.body.image_two,
        author: req.body.author,
        category: req.body.category
    });
    try {
        const savedPost = await post.save();
        res.json({"message": "Post Completed!"});
    } catch (err) {
        return({ message : err});
    }
})

module.exports = router;

// may be I will be deploying to heroku finally