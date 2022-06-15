const express = require('express');                       
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.send("hello it's about")
    } catch (err) {
        return({message: err})
    }
})

module.exports = router;