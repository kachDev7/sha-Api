const express = require('express');                       
const router = express.Router();

router.get('/', (req, res) => {
    try {
        res.send("hello")
    } catch (err) {
        return({message: err})
    }
})

module.exports = router;