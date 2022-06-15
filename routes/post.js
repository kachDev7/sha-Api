const express = require('express');
const Post = require('../models/Post');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const gotPosts = await Post.find();
        res.json(gotPosts);
    } catch (err) {
        return({ message: err})
    }
})

// req for a post with postId
router.get('/:postId', async (req, res) => {
    try{
        const gotPost = await Post.findOne({_id : req.params.postId});
        res.json(gotPost);
    } catch (err) {
        return({ message: err})
    }
})

// Shannels Post Request
router.post('/', async(req, res) => {
    const post = new Post({
        title: req.body.title,
        body1: req.body.body1,
        body2: req.body.body2,
        preview: req.body.preview,
        image1: req.body.image1,
        image2: req.body.image2,
        author: req.body.author,
        category: req.body.category
    })
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        return({ message : err})
    }
})

module.exports = router;