const express = require('express');
const Post = require('../models/Post');
const multer = require('multer');
const cloudinary = require('./cloudinary')
const fs = require('fs')

// Init Router
const router = express.Router();

// Set up Multer Storage for images
const storage = multer.diskStorage({
    // image destination
    destination: (req, file, cb) => {
        cb(null, './public/uploads/images/')
    },
    // image name
    filename: (req, file, cb) => {
        cb(null,  Date.now() + file.originalname)
    }
})

//  Multer upload  setup
const upload = multer({
    storage: storage
})
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
router.post('/', upload.array("image1"), async(req, res) => {
    // save images to Cloudinary and return the URLs and IDs
    const uplaoder = async (path) => await cloudinary.uploads(path, "sha-images");
    const urls = []
    const files = req.files;
    for(const file of files){
        const { path } = file;
        const newPath = await uplaoder(path);
        urls.push(newPath);
        fs.unlinkSync(path)
    }
    console.log(urls)
    const image1 = urls[0].url
    const image2 = urls[1].url
    
    // set vlalues from req Post Schema
    const post = new Post({
        title: req.body.title,
        body1: req.body.body1,
        body2: req.body.body2,
        preview: req.body.preview,
        image1: image1,
        image2: image2,
        author: req.body.author,
        category: req.body.category
    })
    try {
        const savedPost = await post.save();
        res.json({"message": "Post Completed!"});
        // console.log(savedPost)
    } catch (err) {
        return({ message : err})
    }
})

module.exports = router;